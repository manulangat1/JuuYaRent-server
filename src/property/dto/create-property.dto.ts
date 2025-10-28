import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Crestwood apartments',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Wambaa Wamakima road',
  })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 24,
  })
  totalNumberUnits: number;

  // @IsNotEmpty()
  // @IsDate()
  // @ApiProperty({
  //   // example: 'Crestwood apartments',
  // })
  // rentCollectionDate: string;
}
