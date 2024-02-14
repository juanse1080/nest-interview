import { Prisma, PrismaService, User } from '@nest-interview/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataAccessUserService {
  constructor(private prisma: PrismaService) {}

  async getUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      include: {
        roles: true,
      },
      where: userWhereUniqueInput,
    });
  }

  async getAll(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = options;

    return this.prisma.user.findMany({
      include: {
        roles: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      include: {
        roles: true,
      },
      data,
    });
  }

  async updateUser(options: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = options;
    return this.prisma.user.update({
      include: {
        roles: true,
      },
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      include: {
        roles: true,
      },
      where,
    });
  }
}
