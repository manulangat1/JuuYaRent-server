import { Global, Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const options = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!options) {
          throw new Error('TypeORM configuration not found in configService');
        }
        return options;
      },
    }),

    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        inject: [AppconfigService],
        useFactory: (config: AppconfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.redisConfig.redisHost,
            port: Number(config.redisConfig.redisPort),
            username: config.redisConfig.redisUsername,
            password: config.redisConfig.redisPassword,
          },
        }),
      },
    ]),
  ],
  providers: [AppconfigService],
  exports: [AppconfigService],
})
export class AppconfigModule {}
