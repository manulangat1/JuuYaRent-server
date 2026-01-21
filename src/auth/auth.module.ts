import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AppconfigService } from '../appconfig/appconfig.service';
import { ConfigService } from '@nestjs/config';
import { EmailsModule } from '../emails/emails.module';
import { AgentModule } from '../agent/agent.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
    AdminModule,
    EmailsModule,
    AgentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
