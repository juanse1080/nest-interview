import { User } from '@nest-interview/prisma-client';

export interface AuthUser extends Omit<User, 'password'> {
  token: string;
}
