import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../db/entities/property.entity';
import { DataSource, Repository } from 'typeorm';
import { Unit } from '../db/entities/unit.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Admin } from '../db/entities/Admin.entity';
import { Portfolio } from '../db/entities/portfolio.entity';
import { _404 } from '../common/constants/error-messages';
import { dataResponse } from '../common/dto/data-response.dto';
import { generateRandomText } from '../common/lib/auth';

@Injectable()
export class PropertyService {
  private logger = new Logger('Property');
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Unit) private unitRepository: Repository<Unit>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,

    private dataSource: DataSource,
  ) {}

  /**
   *
   * @param dto
   * @param portfolio
   * @returns
   */

  async createAndSaveProperty(
    dto: CreatePropertyDto,
    portfolio: Portfolio,
  ): Promise<Property> {
    const property = await this.propertyRepository.create({
      ...dto,
      totalNumUnits: dto.totalNumberUnits,
      portfolio: portfolio,
    });

    await this.propertyRepository.save(property);
    return property;
  }

  /**
   *
   * @param dto
   * @param admin
   * @param portfolioID
   * @returns
   */
  async create(dto: CreatePropertyDto, admin: Admin, portfolioID: number) {
    //  get the portfolio based on the portfolioID
    this.logger.log(`Adding a new property`);

    const portfolio = await this.portfolioRepository.findOneBy({
      id: portfolioID,
    });
    if (!portfolio) throw new BadRequestException(_404.PORTFOLIO_NOT_FOUND);

    //  now create the property here.
    // wrap this inside a transaction manager.

    const property = await this.dataSource.transaction(async (manager) => {
      const newProperty = await this.createAndSaveProperty(dto, portfolio);
      //   create units based on the totalNumOfUnits in the property
      for (var i = 0; i < newProperty.totalNumUnits; i++) {
        this.logger.log(`Currently on unit number ${i}`);
        const newUnit = this.unitRepository.create({
          name: generateRandomText(4),
          rentPerMonth: '25000',
          property: newProperty,
        });
        await this.unitRepository.save(newUnit);
      }
      return newProperty;
    });
    this.logger.log(`New property added successfully`);
    return dataResponse(property, 'New Property added successfully');
  }
}
