import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('department_profile')
export class DepartmentProfile {
  @PrimaryColumn()
  user_id: string;

  @Column({ length: 10 })
  department_id: string;

  @Column({ length: 50 })
  department_name: string;
}
