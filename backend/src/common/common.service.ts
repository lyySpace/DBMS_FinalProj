import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentProfile } from '../entities/department-profile.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(DepartmentProfile)
    private readonly deptRepo: Repository<DepartmentProfile>,
  ) {}

  async getDepartments() {
    const rows = await this.deptRepo.find({
      select: ['department_id', 'department_name'],
      order: { department_id: 'ASC' },
    });

    return rows.map((d) => ({
      id: d.department_id,
      name: d.department_name,
    }));
  }
}
