import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma, Role } from '@nest-interview/prisma-client';

@Injectable()
export class DataAccessRoleService {
  constructor(private prisma: PrismaService) {}

  async getUnique(
    userWhereUniqueInput: Prisma.RoleWhereUniqueInput
  ): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getAll(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = options;

    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  async updateRole(options: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = options;
    return this.prisma.role.update({
      data,
      where,
    });
  }

  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return this.prisma.role.delete({
      where,
    });
  }
}
