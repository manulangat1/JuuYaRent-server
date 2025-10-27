import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../db/entities/portfolio.entity';
import { CreatePortfolioDTO } from './dto/create-portfolio.dto';
import { dataResponse, DataResponseDTO } from '../common/dto/data-response.dto';
import { Admin } from '../db/entities/Admin.entity';

@Injectable()
export class PortfolioService {
  private logger = new Logger('Portfolio');
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async getPortfolioById(id: number, admin?: Admin): Promise<Portfolio> {
    const portfolioExists = await this.portfolioRepository.findOne({
      where: {
        id,
      },
      relations: ['agent'],
    });

    // throw a 404 error here
    if (!portfolioExists) {
      this.logger.error(`Portfolio with ID of ${id} does not exist`);
      throw new BadRequestException();
    }
    return portfolioExists;
  }

  /**
   *
   * @param dto
   * @param admin
   * @returns newly created portfolio DTO
   */

  async create(
    dto: CreatePortfolioDTO,
    admin: Admin,
  ): Promise<DataResponseDTO> {
    const { name, description, location } = dto;
    this.logger.log(`Creating a new portfolio with the name ${name}`);

    // should there be a limit on the maximum number of portfolios an admin can have?

    const newPortofolio = await this.portfolioRepository.create({
      name,
      description,
      location,
      admin,
    });
    await this.portfolioRepository.save(newPortofolio);
    return dataResponse(newPortofolio);
  }

  /**
   *
   * @param admin
   * @returns list of all portfolios for a particular admin.
   */

  async getAllPortofolioForAdmin(admin: Admin): Promise<Portfolio[]> {
    const portfolios = await this.portfolioRepository.find({
      where: {
        admin,
      },
      order: { createdAt: 'ASC' },
    });

    return portfolios;
  }

  /**
   *
   * @param admin
   * @param portfolioID
   * @returns portfolio details and a list of all the admins therein in the portfolio.
   */
  async listAllAgentsInAPortfolio(
    admin: Admin,
    portfolioID: number,
  ): Promise<any> {
    const portfolio = await this.getPortfolioById(portfolioID, admin);
    return portfolio;
  }
}
