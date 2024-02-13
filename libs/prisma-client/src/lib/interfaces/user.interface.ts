import { Role, User as UserPrisma } from '@prisma/client';

export interface User extends UserPrisma {
  roles: Role[];
}
