import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../db/entities/agent.entity';
import { Portfolio } from '../db/entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Portfolio])],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
