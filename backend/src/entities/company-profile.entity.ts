import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('company_profile')
export class CompanyProfile {
  @PrimaryColumn()
  company_id: string;

  @Column({ length: 50 })
  company_name: string;

  @Column({ length: 50 })
  contact_person: string;

  @Column({ length: 50 })
  industry: string;
}
