import { DataAccessUserService } from '@nest-interview/data-access';
import { User } from '@nest-interview/prisma-client';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { Pagination } from '../app/interfaces/pagination.interface';
import { CreateUserInput } from './interfaces/create-user.interface';
import { UpdateUserInput } from './interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly dataAccessUserService: DataAccessUserService) {}

  async create({ name, email, roles }: CreateUserInput): Promise<User> {
    const tempPassword = 'test';
    const hashedPassword = await bcryptjs.hash(tempPassword, 10);

    return await this.dataAccessUserService.createUser({
      name,
      email,
      password: hashedPassword,
      roles: {
        connect: roles.map((role) => ({ code: role })),
      },
    });
  }

  findAll(pagination: Pagination): Promise<User[]> {
    return this.dataAccessUserService.getAll({
      ...pagination,
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.dataAccessUserService.getUnique({
      id,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(
    id: number,
    { roles, ...others }: UpdateUserInput
  ): Promise<User> {
    await this.findOne(id);

    return await this.dataAccessUserService.updateUser({
      data: {
        roles: {
          set: roles.map((role) => ({ code: role })),
        },
        ...others,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);

    return await this.dataAccessUserService.deleteUser({
      id,
    });
  }
}
