import { Test, TestingModule } from '@nestjs/testing';
import { ResourceConditionController } from './resource-condition.controller';

describe('ResourceConditionController', () => {
  let controller: ResourceConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceConditionController],
    }).compile();

    controller = module.get<ResourceConditionController>(ResourceConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
