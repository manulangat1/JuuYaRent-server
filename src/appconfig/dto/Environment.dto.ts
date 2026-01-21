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
  MAIL_TRAP_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  MAIL_TRAP_SENDER_EMAIL: string;

  @IsNotEmpty()
  @IsString()
  MAIL_TRAP_SENDER_NAME: string;
}
