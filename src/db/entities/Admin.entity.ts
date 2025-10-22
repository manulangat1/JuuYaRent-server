import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../common/lib/auth';
import { Portfolio } from './portfolio.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  salt: string;

  @Column('boolean')
  isSuperAdmin: Boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.admin)
  portfolio: Portfolio[];

  @BeforeInsert()
  @BeforeUpdate()
  private async passwordHashing(): Promise<void> {
    if (this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
