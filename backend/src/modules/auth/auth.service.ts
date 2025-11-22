import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

import { User } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { StudentProfile } from '../../entities/student-profile.entity';
import { CompanyProfile } from '../../entities/company-profile.entity';
import { DepartmentProfile } from '../../entities/department-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,

    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  /* -----------------------------------------------------------
      產生 access + refresh tokens
    -----------------------------------------------------------*/
  async generateTokens(user: User) {
    const payload = { sub: user.user_id, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    // 寫入 Redis session
    await this.redis.set(
      `refresh:${refreshToken}`,
      String(user.user_id),
      'EX',
      7 * 24 * 3600,
    );

    return { accessToken, refreshToken };
  }

  private async checkProfileFilled(user: User) {
    if (user.role === 'student') {
      const count = await this.dataSource.getRepository(StudentProfile)
        .count({ where: { user_id: user.user_id } });

      return count > 0;
    }

    if (user.role === 'company') {
      const count = await this.dataSource.getRepository(CompanyProfile)
        .count({ where: { user_id: user.user_id } });

      return count > 0;
    }

    if (user.role === 'admin') {
      const count = await this.dataSource.getRepository(DepartmentProfile)
        .count({ where: { user_id: user.user_id } });

      return count > 0;
    }

    return false;
  }


  // register and auto login
  async register(dto: RegisterDto) {
    const {
      username,
      email,
      password,
      role,
      real_name,
      nickname,
    } = dto;

    // check if email or username existed
    const existed = await this.userRepo.findOne({
      where: [{ email }, { username }],
    });
    if (existed) {
      throw new BadRequestException('Email or username already exists');
    }

    const hashedPw = await bcrypt.hash(password, 10);

    // create user
    const user = await this.dataSource.transaction(async manager => {
      const entity = manager.create(User, {
        username,
        email,
        password: hashedPw,
        real_name,
        nickname,
        role,
        has_filled_profile: false,
      });
      await manager.save(User, entity);
      return entity;
    });

    // registration successful, auto login
    const tokens = await this.generateTokens(user);

    const { password: _, ...safeUser } = user;
    const profileFilled = await this.checkProfileFilled(user);
    return {
      user: safeUser,
      ...tokens,
      needProfile: !profileFilled,
    };
  }


  // Login
  async login(dto: LoginDto) {
    const { identifier, password } = dto;

    // identifier = username or email
    const user = await this.userRepo.findOne({
      where: [
        { username: identifier },
        { email: identifier },
      ],
    });

    if (!user) {
      throw new BadRequestException('User not exists, please register first');
    }

    const pwMatches = await bcrypt.compare(password, user.password);
    if (!pwMatches) {
      throw new BadRequestException('Invalid username/email or password');
    }

    const tokens = await this.generateTokens(user);
    const { password: _, ...safeUser } = user;
    const profileFilled = await this.checkProfileFilled(user);
    return {
      user: safeUser,
      ...tokens,
      needProfile: !profileFilled,
    };
  }

  /* -----------------------------------------------------------
      Refresh token → 發新 access token
    -----------------------------------------------------------*/
  async refresh(refreshToken: string) {
    // Step 1：查 Redis session
    const userId = await this.redis.get(`refresh:${refreshToken}`);
    if (!userId) {
      throw new UnauthorizedException('Session expired');
    }

    // Step 2：驗證 refresh token 的有效性
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Step 3：查 user
    const user = await this.userRepo.findOne({ where: { user_id: userId } });
    if (!user) throw new UnauthorizedException('User no longer exists');

    // Step 4：刷新 tokens
    const newTokens = await this.generateTokens(user);

    // Step 5：刪掉舊 refresh token session
    await this.redis.del(`refresh:${refreshToken}`);
    const profileFilled = await this.checkProfileFilled(user);
    return {
      ...newTokens,
      role: user.role,
      needProfile: !profileFilled,
    };
  }

  /* -----------------------------------------------------------
      登出（刪除 session）
    -----------------------------------------------------------*/
  async logout(refreshToken: string) {
    await this.redis.del(`refresh:${refreshToken}`);
    return { success: true };
  }
}
