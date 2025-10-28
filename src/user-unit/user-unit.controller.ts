import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserUnitService } from './user-unit.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

// @Controller('user-unit')
@Controller()
@ApiTags('user units')
@ApiSecurity('access-token')
export class UserUnitController {
  constructor(private readonly userUnitService: UserUnitService) {}

  @Post('units/:id/userUnit')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userUnitService.create(id, dto);
  }
}
