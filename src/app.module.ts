import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppconfigModule } from './appconfig/appconfig.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/all_exception.filter';
import { TrimmerMiddleware } from './common/middleware/trimmer.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [AppconfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TrimmerMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
