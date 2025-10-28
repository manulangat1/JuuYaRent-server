import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiSecurity('access-token')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
