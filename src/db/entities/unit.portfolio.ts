import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from './base.entity';

@Entity()
export class Unit extends CommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rentPerMonth: string;
}
