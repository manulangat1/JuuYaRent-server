import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('agents')
@ApiSecurity('access-token')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('create/:portfolioID')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAgentDto,
    @Param('portfolioID', new ParseIntPipe()) portfolioID: number,
  ) {
    return this.agentService.create(dto, portfolioID);
  }
}
