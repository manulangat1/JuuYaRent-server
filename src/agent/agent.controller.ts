import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { UserType } from '../common/decorators/user-type.decorator';
import { Type } from '../common/constants/types.enum';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Admin } from '../db/entities/Admin.entity';
import { UpdateAgentStatus } from './dto/update-agent-status.dto';

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

  @Patch('/:agentID')
  @UserType(Type.ADMIN)
  async updateAdminStatus(
    @CurrentUser() admin: Admin,
    @Param('agentID', new ParseIntPipe()) id: number,
    @Body() dto: UpdateAgentStatus,
  ) {
    return this.agentService.updateAgentStatus(id, dto);
  }
}
