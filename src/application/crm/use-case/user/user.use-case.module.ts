import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { GetAllUsersUseCase } from './get-all-users.use-case';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { UpdateUserUseCase } from './update-user.use-case';

@Module({
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
  ],
})
export class UserUseCaseModule {}
