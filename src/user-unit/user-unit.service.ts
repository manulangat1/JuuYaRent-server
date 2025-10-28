import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUnit } from '../db/entities/userUnit.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Unit } from '../db/entities/unit.entity';
import { User } from '../db/entities/User.entity';
import { generateRandomText } from '../common/lib/auth';
import { UnitStatus } from '../common/constants/types.enum';
import { _400 } from '../common/constants/error-messages';

@Injectable()
export class UserUnitService {
  private logger = new Logger('User unit');
  constructor(
    @InjectRepository(UserUnit)
    private userUnitRepository: Repository<UserUnit>,
    @InjectRepository(Unit) private unitRepository: Repository<Unit>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(unitID: string, dto: CreateUserDto): Promise<any> {
    this.logger.log('creating a new user and associated new user unit');
    const unit = await this.unitRepository.findOne({
      where: {
        pkid: unitID,
      },
    });

    if (!unit) throw new BadRequestException('Unit with ID not found');

    const user = await this.dataSource.transaction(async (manager) => {
      const unitVacant = await this.userUnitRepository
        .createQueryBuilder('userUnit')

        .where('userUnit.unitId = :id', { id: unit.id })
        .andWhere('userUnit.status IN (:...status)', {
          status: [UnitStatus.OCCUPIED, UnitStatus.BOOKED],
        })
        .getOne();

      if (unitVacant)
        throw new BadRequestException(`Unit is either OCCUPIED OR BOOKED`);

      // generate a new password here.
      const password = generateRandomText(8);

      //  check whether the user with email already exists.

      const userExists = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: dto.email })
        .getOne();

      if (userExists)
        throw new BadRequestException(
          'User with the specified email already exists',
        );

      const newUser = await this.userRepository.create({
        ...dto,
        password,
        activatedAt: new Date(),
      });
      await this.userRepository.save(newUser);

      // TODO: come and send the password via a notification service here.

      //  now attach the user and unit via the user unit table
      const newUserUnit = await this.userUnitRepository.create({
        unit,
        user: newUser,
        status: UnitStatus.BOOKED,
      });
      await this.userUnitRepository.save(newUserUnit);

      return newUserUnit;
    });

    return user;
  }
}
