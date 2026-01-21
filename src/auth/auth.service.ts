import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAdmin } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { LoginDTO } from '../admin/dto/login.dto';
import { comparePassword } from '../common/lib/auth';
import { _400, _401, _404 } from '../common/constants/error-messages';
import { Admin } from '../db/entities/Admin.entity';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { AdminLoginDTO } from '../admin/dto/admin-login-response.dto';
import { EmailsService } from '../emails/emails.service';
import { Agent } from 'http';
import { AgentService } from '../agent/agent.service';
import { Type } from '../common/constants/types.enum';

@Injectable()
export class AuthService {
  private logger = new Logger('Auth');
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private mailService: EmailsService,
    private agentService: AgentService,
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
      Type.ADMIN,
    );

    this.logger.log(`Logging in susccess for user with email ${email}`);

    // TEST email sending bit.
    await this.mailService.sendWelcomeEmail({
      recipient: email,
    });

    return generateAccessToken;
  }

  async loginAgent(dto: LoginDTO): Promise<Agent | void> {
    const { email, password } = dto;
    this.logger.log(`Logging in the agent with email ${email}`);
    const agentExists = await this.agentService.findOneWithOptions({
      where: {
        email,
      },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'password',
        'salt',
        'portfolio',
      ],
    });
    if (!agentExists) throw new BadRequestException(_401.BAD_REQUEST);

    // check for password matching

    // const passwordMatch = await comparePassword(agentExists, password);

    // if (!passwordMatch) throw new BadRequestException(_400.INVALID_CREDENTIALS);

    const generateAccessToken = await this.loginJWTResponse(
      plainToInstance(AdminLoginDTO, agentExists),
      Type.Agent,
    );

    this.logger.log(`Logging in susccess for user with email ${email}`);
    return generateAccessToken;
    // const passwordMatch = await comparePassword(agentExists, password);
  }

  async loginJWTResponse(data: AdminLoginDTO, type: Type): Promise<any> {
    const access_token = await this.jwtService.signAsync({ ...data, type });
    return {
      access_token,
      type,
      data,
    };
  }
}
