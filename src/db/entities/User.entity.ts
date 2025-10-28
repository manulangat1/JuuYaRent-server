import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../common/lib/auth';
import { UserUnit } from './userUnit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ default: false })
  termsAndConditions: string;

  @Column({ default: false })
  isActive: string;

  @Column({ default: false })
  isDeleted: string;

  //TODO: make this column nullable
  @Column({ type: Date })
  activatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => UserUnit, (userUnit) => userUnit.user)
  tenantUnits: UserUnit[];

  @BeforeInsert()
  @BeforeUpdate()
  private async passwordHashing(): Promise<void> {
    if (this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
