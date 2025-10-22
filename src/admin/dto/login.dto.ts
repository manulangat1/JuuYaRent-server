import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user logging in',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the user loggin in',
    example: 'Password@1',
  })
  @IsStrongPassword()
  password: string;
}
