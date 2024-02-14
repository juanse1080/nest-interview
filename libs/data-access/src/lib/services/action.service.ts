import { Action, Prisma, PrismaService } from '@nest-interview/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataAccessActionService {
  constructor(private prisma: PrismaService) {}

  async getUnique(
    userWhereUniqueInput: Prisma.ActionWhereUniqueInput
  ): Promise<Action | null> {
    return this.prisma.action.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getAll(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActionWhereUniqueInput;
    where?: Prisma.ActionWhereInput;
    orderBy?: Prisma.ActionOrderByWithRelationInput;
  }): Promise<Action[]> {
    const { skip, take, cursor, where, orderBy } = options;

    return this.prisma.action.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAction(data: Prisma.ActionCreateInput): Promise<Action> {
    return this.prisma.action.create({
      data,
    });
  }

  async updateAction(options: {
    where: Prisma.ActionWhereUniqueInput;
    data: Prisma.ActionUpdateInput;
  }): Promise<Action> {
    const { where, data } = options;
    return this.prisma.action.update({
      data,
      where,
    });
  }

  async deleteAction(where: Prisma.ActionWhereUniqueInput): Promise<Action> {
    return this.prisma.action.delete({
      where,
    });
  }
}
