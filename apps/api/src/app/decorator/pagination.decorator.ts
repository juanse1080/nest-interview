import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from '../interfaces/pagination.interface';

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const avoid_pagination = (req.query.avoid_pagination as string) ?? false;
    if (avoid_pagination)
      return { take: undefined, skip: undefined, page: undefined };

    const page = parseInt((req.query.page as string) ?? '0');
    const per_page = parseInt((req.query.per_page as string) ?? '10');

    if (isNaN(page) || page < 0 || isNaN(per_page) || per_page < 0)
      throw new BadRequestException('Invalid pagination params');

    if (per_page > 100)
      throw new BadRequestException(
        'Invalid pagination params: Max per_page is 100'
      );

    return { take: per_page, skip: page * per_page, page };
  }
);
