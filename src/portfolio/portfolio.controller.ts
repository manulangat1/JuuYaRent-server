import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDTO } from './dto/create-portfolio.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Admin } from '../db/entities/Admin.entity';
import { ApiSecurity } from '@nestjs/swagger';
import { Portfolio } from '../db/entities/portfolio.entity';

@Controller('portfolios')
@ApiSecurity('access-token')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  async create(@Body() dto: CreatePortfolioDTO, @CurrentUser() admin: Admin) {
    return this.portfolioService.create(dto, admin);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getByAdmin(@CurrentUser() admin: Admin): Promise<Portfolio[]> {
    return this.portfolioService.getAllPortofolioForAdmin(admin);
  }

  @Get('/:id/agents')
  async getAgentsInPortfolio(
    @CurrentUser() admin: Admin,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.portfolioService.listAllAgentsInAPortfolio(admin, id);
  }
}
