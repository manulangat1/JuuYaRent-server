import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppconfigModule } from './appconfig/appconfig.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/all_exception.filter';
import { TrimmerMiddleware } from './common/middleware/trimmer.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './common/guards/auth.guard';
import { AgentModule } from './agent/agent.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PropertyModule } from './property/property.module';
import { UserUnitModule } from './user-unit/user-unit.module';
import { UserModule } from './user/user.module';
import { EmailsModule } from './emails/emails.module';
import { UserTypeGuard } from './common/guards/user-type.guard';

@Module({
  imports: [
    AppconfigModule,
    AuthModule,
    AdminModule,
    AgentModule,
    PortfolioModule,
    PropertyModule,
    UserUnitModule,
    UserModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserTypeGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TrimmerMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
