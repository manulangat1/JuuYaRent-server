import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../common/lib/auth';
import { Portfolio } from './portfolio.entity';
import { AgentStatus } from '../../common/constants/types.enum';

@Entity()
@Index(['email'])
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar', { select: false })
  salt: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.agent)
  portfolio: Portfolio;

  @Column({ enum: AgentStatus, default: AgentStatus.REGISTERED })
  status: AgentStatus;

  @BeforeInsert()
  @BeforeUpdate()
  private async passwordHashing(): Promise<void> {
    if (this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
