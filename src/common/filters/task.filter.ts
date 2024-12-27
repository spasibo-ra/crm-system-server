import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ITaskFilter {
  status?: 'pending' | 'in_progress' | 'complited';
  managerId?: string;
  customerId?: string;
  dealId?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
}

export const TaskFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ITaskFilter => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const user = request.user;
    return {
      status: query.status as 'pending' | 'in_progress' | 'complited',
      managerId: query.managerId ? query.managerId : user.id,
      customerId: query.customerId ? query.customerId : undefined,
      dealId: query.dealId ? query.dealId : undefined,
      dueDateFrom: query.dueDateFrom ? new Date(query.dueDateFrom) : undefined,
      dueDateTo: query.dueDateTo ? new Date(query.dueDateTo) : undefined,
    };
  },
);
