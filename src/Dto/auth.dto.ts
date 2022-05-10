import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly username: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly username: string;

  @IsString()
  public readonly password: string;
}