import { User } from '@nest-interview/prisma-client';

export interface AuthUser extends Omit<User, 'password' | 'roles'> {
  token: string;
  actions: string[];
}
