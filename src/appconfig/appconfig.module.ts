import { Global, Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [AppconfigService],
})
export class AppconfigModule {}
