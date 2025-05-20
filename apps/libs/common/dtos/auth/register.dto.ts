import { IsString, IsEmail, MinLength, IsUUID } from 'class-validator';

export class RegisterDto {
  @IsUUID()
  userId: string;
  
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
