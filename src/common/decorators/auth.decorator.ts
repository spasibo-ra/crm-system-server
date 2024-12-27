import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@app/domain/crm/user';
import { RolesGuard } from '@common/guards/roles.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
  );
}
