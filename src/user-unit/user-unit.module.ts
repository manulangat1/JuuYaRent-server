import { Module } from '@nestjs/common';
import { UserUnitService } from './user-unit.service';
import { UserUnitController } from './user-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUnit } from '../db/entities/userUnit.entity';
import { UserModule } from '../user/user.module';
import { Unit } from '../db/entities/unit.entity';
import { User } from '../db/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserUnit, Unit, User])],
  controllers: [UserUnitController],
  providers: [UserUnitService],
})
export class UserUnitModule {}
