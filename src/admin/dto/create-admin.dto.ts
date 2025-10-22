import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdmin {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Emmanuel',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Password@1' })
  password: string;
}
