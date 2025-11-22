import { Module } from '@nestjs/common';
import { ResourceConditionController } from './resource-condition.controller';
import { ResourceConditionService } from './resource-condition.service';

@Module({
  controllers: [ResourceConditionController],
  providers: [ResourceConditionService]
})
export class ResourceConditionModule {}
