import { IsEmail, IsNotEmpty } from 'class-validator';

export class WelcomeEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  recipient: string;
}
