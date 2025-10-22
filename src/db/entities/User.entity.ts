import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../common/lib/auth';

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

  // @Column({ type: Date })
  // deletedAt: Date;

  @Column({ type: Date })
  activatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async passwordHashing(): Promise<void> {
    if (this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
