import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '@shared/constants';

import { UsersController } from './infrastructure/controllers/users.controller';
import { KnexUserRepository } from './infrastructure/database/knexuser.repository';

import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-email.use-case';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    { provide: USERS_REPOSITORY, useClass: KnexUserRepository },
    GetAllUsersUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserByEmailUseCase,
  ],
  exports: [CreateUserUseCase, GetUserByEmailUseCase],
})
export class UsersModule {}
