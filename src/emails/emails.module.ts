import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { AppconfigModule } from '../appconfig/appconfig.module';

@Module({
  // imports: [AppconfigModule],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
