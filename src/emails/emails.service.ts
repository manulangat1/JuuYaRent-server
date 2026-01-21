import { Injectable, Logger } from '@nestjs/common';
import { AppconfigService } from '../appconfig/appconfig.service';
import { MailtrapClient } from 'mailtrap';
import { WelcomeEmailDTO } from './dto';
import { from } from 'rxjs';

@Injectable()
export class EmailsService {
  private readonly client;
  private logger = new Logger('Email Service');

  constructor(private readonly configService: AppconfigService) {
    const token = this.configService.mailTrapToken;
    this.client = new MailtrapClient({
      token,
    });
  }

  getSenderInformation() {
    return {
      email: this.configService.mailTrapSenderDetails.senderEmail,
      name: this.configService.mailTrapSenderDetails.senderName,
    };
  }

  async sendEmail(data) {
    await this.client.send({ ...data });
  }
  async sendWelcomeEmail(dto: WelcomeEmailDTO): Promise<void> {
    await this.client.send({
      from: this.getSenderInformation(),
      to: [{ email: dto.recipient }],
      subject: 'Hello world',
      text: 'Thank you for signing up with us!',
    });
    this.logger.log(`Welcome email sent to ${dto.recipient}`);
  }

  async sendPassword(email: string, password: string): Promise<void> {
    const recipient = [
      {
        email,
      },
    ];

    const data = {
      from: this.getSenderInformation(),
      to: recipient,
      subject: 'You new password',
      text: `Your new password is ${password}`,
    };

    await this.sendEmail(data);
    this.logger.log(`Password email sent to ${email}`);
  }
}
