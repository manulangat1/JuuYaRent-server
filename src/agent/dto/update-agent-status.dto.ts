import { IsEnum, IsNotEmpty } from 'class-validator';
import { AgentStatus } from '../../common/constants/types.enum';

export class UpdateAgentStatus {
  @IsEnum(AgentStatus)
  @IsNotEmpty()
  status: AgentStatus;
}
