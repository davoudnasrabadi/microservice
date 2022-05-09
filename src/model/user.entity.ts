import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column('boolean', {default: false})
  isdeleted:boolean;
  
  @Column({ type: 'date',default:Date.now() })
  created_at: string;

  @Column({ type: 'date',default:Date.now()})
  updatedAt: string;

  @Column({ type: 'date'})
  deletedAt: string;

}