import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { GetAllUsersUseCase } from './get-all-users.use-case';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';

@Module({
  providers: [
    GetUserByIdUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
  ],
  exports: [
    GetUserByIdUseCase,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
  ],
})
export class UserUseCaseModule {}
