import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../../entities/user.entity';
import { StudentProfile } from '../../entities/student-profile.entity';
import { DepartmentProfile } from '../../entities/department-profile.entity';
import { CompanyProfile } from '../../entities/company-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      StudentProfile,
      DepartmentProfile,
      CompanyProfile,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: '15m' },
    }),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
