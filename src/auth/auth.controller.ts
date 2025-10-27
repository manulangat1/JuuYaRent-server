import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdmin } from '../admin/dto/create-admin.dto';
import { LoginDTO } from '../admin/dto/login.dto';
import { Public } from '../common/decorators/Public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async createAdmin(@Body() dto: CreateAdmin) {
    return this.authService.signAdminUp(dto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async loginAdmin(@Body() dto: LoginDTO) {
    return this.authService.loginAdmin(dto);
  }
}
