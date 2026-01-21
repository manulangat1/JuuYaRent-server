import { Global, Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { AppconfigModule } from '../appconfig/appconfig.module';

@Global()
@Module({
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
