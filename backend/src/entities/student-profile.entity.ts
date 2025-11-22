import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('student_profile')
export class StudentProfile {
  @PrimaryColumn()
  user_id: string;

  @Column({ length: 10 })
  student_id: string;

  @Column({ length: 10 })
  department_id: string;

  @Column({ nullable: true })
  entry: string;

  @Column({ nullable: true })
  grade: string;
}
