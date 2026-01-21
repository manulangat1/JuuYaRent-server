import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAdmin } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { LoginDTO } from '../admin/dto/login.dto';
import { comparePassword } from '../common/lib/auth';
import { _400 } from '../common/constants/error-messages';
import { Admin } from '../db/entities/Admin.entity';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { AdminLoginDTO } from '../admin/dto/admin-login-response.dto';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class AuthService {
  private logger = new Logger('Auth');
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private mailService: EmailsService,
  ) {}

  async signAdminUp(dto: CreateAdmin) {
    const admin = await this.adminService.create(dto);
    return admin;
  }

  async loginAdmin(dto: LoginDTO): Promise<Admin> {
    const { email, password } = dto;
    this.logger.log(`Logging in the user with email ${email}`);

    // check if user exists

    const adminExists = await this.adminService.checkEmailExists(email);

    // check for password matching

    const passwordMatch = await comparePassword(adminExists, password);

    if (!passwordMatch) throw new BadRequestException(_400.INVALID_CREDENTIALS);

    // generate jwt and store it here

    const generateAccessToken = await this.loginJWTResponse(
      plainToInstance(AdminLoginDTO, adminExists, {
        // excludeExtraneousValues: true,
      }),
    );

    this.logger.log(`Logging in susccess for user with email ${email}`);

    // TEST email sending bit.
    await this.mailService.sendWelcomeEmail({
      recipient: email,
    });

    return generateAccessToken;
  }

  async loginJWTResponse(data: AdminLoginDTO): Promise<any> {
    const access_token = await this.jwtService.signAsync({ ...data });
    return {
      access_token,
      data,
    };
  }
}
