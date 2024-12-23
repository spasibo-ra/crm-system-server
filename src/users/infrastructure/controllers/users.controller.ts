import {
  Controller,
  Body,
  Patch,
  Param,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UpdateUserUseCase } from '@users/application/use-cases/update-user.use-case';
import { GetAllUsersUseCase } from '@users/application/use-cases/get-all-users.use-case';

import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import { UpdateUserDto } from '@users/application/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get()
  async getAllUsers(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllUsersUseCase.execute(limit, page);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
