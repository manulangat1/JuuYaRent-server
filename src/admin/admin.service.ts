import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAdmin } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _400 } from '../common/constants/error-messages';
import { Admin } from '../db/entities/Admin.entity';

@Injectable()
export class AdminService {
  private logger = new Logger('Admin');
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async create(dto: CreateAdmin): Promise<Admin> {
    this.logger.log(`Logging in user with email ${dto.email}`);

    const emailExists = await this.adminRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (emailExists) throw new BadRequestException(_400.EMAIL_EXISTS);

    const admin = await this.adminRepository.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      isSuperAdmin: false,
    });
    await this.adminRepository.save(admin);
    this.logger.log(`Admin successfully created!`);
    return admin;
  }

  async checkEmailExists(email: string) {
    const adminExists = await this.adminRepository.findOne({
      where: {
        email: email,
      },
      select: [
        'id',
        'email',
        'password',
        'salt',
        'isSuperAdmin',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!adminExists) {
      throw new BadRequestException(_400.INVALID_CREDENTIALS);
    }
    return adminExists;
  }
}
