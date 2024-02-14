import {
  IsString,
  MinLength,
  IsEmail,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Exist, IsUnique } from '@nest-interview/prisma-client';
import { CreateUserInput } from '../interfaces/create-user.interface';

export class CreateUserDto implements CreateUserInput {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  @IsUnique({ table: 'user', column: 'email' })
  email: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Exist({
    table: 'role',
    column: 'code',
    condition: (value) => ({ in: value }),
    validate: (value, response) => {
      return value.length === response.length;
    },
  })
  roles: string[];
}
