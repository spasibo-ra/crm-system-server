import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface PaginationParams {
  page: number;
  limit: number;
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();
    const { page = '1', limit = '10' } = request.query;

    return {
      page: Math.max(parseInt(page, 10) || 1, 1),
      limit: Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100),
    };
  },
);
