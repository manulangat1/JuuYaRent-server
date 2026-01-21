import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDTO } from './dto/Environment.dto';

@Injectable()
export class AppconfigService {
  constructor(private configService: ConfigService<EnvironmentDTO>) {}

  get port(): number {
    return this.configService.getOrThrow<number>('PORT');
  }
  get environment(): string {
    return this.configService.getOrThrow<string>('environment');
  }
  get clientPortalUrl(): string {
    return this.configService.getOrThrow<string>('CLIENT_PORTAL_URL');
  }

  get mailTrapToken(): string {
    return this.configService.getOrThrow<string>('MAIL_TRAP_TOKEN');
  }
  get mailTrapSenderDetails() {
    return {
      senderName: this.configService.getOrThrow<string>(
        'MAIL_TRAP_SENDER_NAME',
      ),
      senderEmail: this.configService.getOrThrow<string>(
        'MAIL_TRAP_SENDER_EMAIL',
      ),
    };
  }
}
