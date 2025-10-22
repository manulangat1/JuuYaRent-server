import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdminLoginDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  salt: string;
}
