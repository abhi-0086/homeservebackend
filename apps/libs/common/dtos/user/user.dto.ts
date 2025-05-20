import { IsString, IsEmail, IsPhoneNumber, MinLength, IsOptional, IsUUID } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}
