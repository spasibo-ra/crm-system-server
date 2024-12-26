import {
  Controller,
  Body,
  Patch,
  Param,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  UpdateUserUseCase,
  GetAllUsersUseCase,
} from '@app/application/crm/use-case/user';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import { Auth } from '@common/decorators/auth.decorator';
import { UpdateUserDto } from '../../dto/user/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get()
  async getAllUsers(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllUsersUseCase.execute(limit, page);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth()
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.execute({ id, user: updateUserDto });
  }
}
