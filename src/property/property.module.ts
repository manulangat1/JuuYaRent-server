import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../db/entities/property.entity';
import { Unit } from '../db/entities/unit.entity';
import { Portfolio } from '../db/entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Unit, Portfolio])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
