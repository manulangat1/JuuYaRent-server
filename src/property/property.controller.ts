import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Admin } from '../db/entities/Admin.entity';

// @Controller('property')
@Controller()
@ApiTags('properties')
@ApiSecurity('access-token')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('portfolios/:id/property')
  async create(
    @Body() dto: CreatePropertyDto,
    @CurrentUser() admin: Admin,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.propertyService.create(dto, admin, id);
  }
}
