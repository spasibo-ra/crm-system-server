import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '@app/domain/crm/user';
import { RolesGuard } from '@common/guards/roles.guard';
import { JwtAuthGuard } from '@common/guards/auth.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
