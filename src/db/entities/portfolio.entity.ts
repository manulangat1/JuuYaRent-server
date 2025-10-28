import {
  //   Admin,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './Admin.entity';
import { Agent } from './agent.entity';
import { Property } from './property.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  description: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Admin, (admin) => admin.portfolio)
  admin: Admin;

  @OneToMany(() => Agent, (agent) => agent.portfolio)
  agent: Agent[];

  @OneToMany(() => Property, (property) => property.portfolio)
  property: Property[];
}
