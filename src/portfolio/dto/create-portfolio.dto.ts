import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'AHF',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'AHF kikuyu',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Kikuyu',
  })
  location: string;
}
