import { IsUnique } from '@nest-interview/prisma-client';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterInput } from '../interfaces/register.dto';

export class RegisterDto implements RegisterInput {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  @IsUnique({ table: 'user', column: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
