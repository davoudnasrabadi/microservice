import { Entity, Column,CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'token' })
export class Token extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  token: string;
  
}