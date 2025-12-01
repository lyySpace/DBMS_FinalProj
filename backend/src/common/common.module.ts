import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { DepartmentProfile } from '../entities/department-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentProfile])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
