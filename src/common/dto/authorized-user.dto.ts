import { Admin } from '../../db/entities/Admin.entity';
import { Agent } from '../../db/entities/agent.entity';
import { User } from '../../db/entities/User.entity';

export class AuthorizedUserDto {
  user: Admin | Agent | User;
  type: string;
  permissions?: [];
}

export const authorizedUser = (
  user: User | Admin | Agent,
  type: string,
  permissions?: [],
): AuthorizedUserDto => ({ user, type, permissions });
