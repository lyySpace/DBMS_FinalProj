import { Test, TestingModule } from '@nestjs/testing';
import { ResourceConditionService } from './resource-condition.service';

describe('ResourceConditionService', () => {
  let service: ResourceConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceConditionService],
    }).compile();

    service = module.get<ResourceConditionService>(ResourceConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
