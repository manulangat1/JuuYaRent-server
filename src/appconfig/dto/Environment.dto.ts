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
}
