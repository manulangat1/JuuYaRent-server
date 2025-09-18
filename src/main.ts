import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppconfigService } from './appconfig/appconfig.service';
import helmet from 'helmet';
import { isIn } from 'class-validator';
import { _401 } from './common/constants/error-messages';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_DOCUMENTATION_URL } from './common/constants/general.constants';
import { Environment } from './common/constants/types.enum';
import { getLogLevels } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, environment, clientPortalUrl } = app.get(AppconfigService);
  const isProductionEnvironment = environment === Environment.production;
  app.useLogger(getLogLevels(isProductionEnvironment));
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'v1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const allowedClientApplications: string[] = [clientPortalUrl];
  if (!isProductionEnvironment) getSwaggerDocumentation(app);
  app.enableCors({
    origin: (origin, callback): void => {
      if (!origin || isIn(origin, allowedClientApplications)) {
        callback(null, origin || clientPortalUrl);
      } else {
        callback(new UnauthorizedException(_401.ORIGIN_NOT_SUPPORTED));
      }
    },
  });

  await app.listen(port);
}
bootstrap();

const getSwaggerDocumentation = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('JuuYaRent')
    .setDescription('Juu ya rent')
    .setVersion('1.0')
    .addTag('Juu Ya Rent')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_DOCUMENTATION_URL, app, documentFactory);
};
