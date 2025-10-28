import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Unit } from './unit.entity';
import { UnitStatus } from '../../common/constants/types.enum';
import { randomUUID } from 'crypto';
@Entity()
export class UserUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  pkid: string;

  @ManyToOne(() => User, (user) => user.tenantUnits)
  user: User;

  @ManyToOne(() => Unit, (unit) => unit.tenantUnits)
  unit: Unit;

  @Column({ nullable: true })
  movedInDate: Date;

  @Column({
    type: 'bool',
    default: true,
  })
  depositPaid: boolean;

  @Column({ type: 'bool', nullable: true })
  noticeGive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    enum: UnitStatus,
  })
  status: UnitStatus;
  @BeforeInsert()
  @BeforeUpdate()
  private async addPkID(): Promise<void> {
    if (!this.pkid) {
      this.pkid = randomUUID();
    }
  }
}
