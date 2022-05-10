import { Entity, Column,CreateDateColumn,JoinColumn ,OneToOne} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Token } from './token.entity';
@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  @Exclude()
  password: string;

  @Column('boolean', {default: false})
  isDeleted:boolean;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable:true}) 
  deletedAt: Date;

  @OneToOne(() => Token)
    @JoinColumn()
    token: Token;
  
}