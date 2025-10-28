import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { Unit } from './unit.entity';
// import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';
@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column()
  pkid: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ default: 100 })
  totalNumUnits: number;

  @Column({ nullable: false, default: 27 })
  rentCollectionDate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.property)
  portfolio: Portfolio;

  @OneToMany(() => Unit, (unit) => unit.property)
  units: Unit[];

  @BeforeUpdate()
  @BeforeInsert()
  private async addPKID(): Promise<void> {
    if (!this.pkid) {
      this.pkid = randomUUID();
      // const { v7: uuidv7 } = await import('uuid');
      // this.pkid = uuidv7();
    }
  }
}
