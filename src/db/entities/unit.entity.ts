import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { UnitStatus } from '../../common/constants/types.enum';
import { UserUnit } from './userUnit.entity';
import { randomUUID } from 'crypto';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  pkid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  rentPerMonth: string;

  @Column({
    type: 'enum',
    enum: UnitStatus,
    default: UnitStatus.VACANT,
  })
  status: UnitStatus;

  @OneToMany(() => UserUnit, (userUnit) => userUnit.unit)
  tenantUnits: UserUnit[];

  @ManyToOne(() => Property, (property) => property.units)
  property: Property;

  @BeforeInsert()
  @BeforeUpdate()
  private async addPkID(): Promise<void> {
    if (!this.pkid) {
      // const { v7: uuidv7 } = await import('uuid');
      // this.pkid = uuidv7();
      this.pkid = randomUUID();
    }
  }
}
