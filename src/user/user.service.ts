import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { _400 } from '../common/constants/error-messages';
import { generateRandomText } from '../common/lib/auth';

@Injectable()
export class UserService {
  private logger = new Logger('User');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createAndSaveNewUser(dto: CreateUserDto, password: string) {
    const newUser = await this.userRepository.create({
      ...dto,
      password,
      activatedAt: new Date(),
    });

    await this.userRepository.save(newUser);
    this.logger.log(`User with email ${dto.email} successfully created`);
    return newUser;
  }

  async create(dto: CreateUserDto) {
    this.logger.log(`Adding a new user`);
    const { firstName, lastName, email } = dto;
    //  check whether user with the same email already exists.

    const userExists = await this.findByEmail(email);

    if (userExists) throw new BadRequestException(_400.EMAIL_EXISTS);

    // generate a new password here.
    const password = generateRandomText(8);

    const user = await this.createAndSaveNewUser(dto, password);

    // TODO:  send the email via the notification service here.

    return user;
  }
}
