import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { Environment } from '../../common/constants/types.enum';

export class EnvironmentDTO {
  @IsDefined()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsEnum(Environment)
  environment: string;

  @IsNotEmpty()
  @IsUrl()
  CLIENT_PORTAL_URL: string;

  @IsNotEmpty()
  @IsString()
  REDIS_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  REDIS_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  REDIS_PORT: number;
}
