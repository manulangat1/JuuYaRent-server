import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AggregateType, OutBoxState } from '../../common/constants/types.enum';

@Entity()
@Index(['status', 'topic', 'aggregateType'])
export class OutboxTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: OutBoxState.REGISTERED })
  status: OutBoxState;

  @Column({
    nullable: false,
  })
  topic: string;

  @Column({
    nullable: false,
  })
  aggregateType: AggregateType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
