import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { ResourceConditionModule } from './resource-condition/resource-condition.module';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
  imports: [ResourceConditionModule]
})
export class ResourceModule {}
