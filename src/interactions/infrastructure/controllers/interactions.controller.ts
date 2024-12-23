import { TokenPayload } from '@auth/domain/entities/token-payload.interface';
import { Auth } from '@common/decorators/auth.decorator';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import {
  CreateInteractionDto,
  UpdateInteractionDto,
} from '@interactions/application/dto';
import {
  CreateInteractionUseCase,
  DeleteInteractionUseCase,
  GetAllInteractionsUseCase,
  GetInteractionByIdUseCase,
  UpdateInteractionUseCase,
} from '@interactions/application/use-cases';
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Interactions')
@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly getAllUseCase: GetAllInteractionsUseCase,
    private readonly getByIdUseCase: GetInteractionByIdUseCase,
    private readonly createUseCase: CreateInteractionUseCase,
    private readonly updateUseCase: UpdateInteractionUseCase,
    private readonly deleteUseCase: DeleteInteractionUseCase,
  ) {}

  @Get()
  async getAll(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllUseCase.execute(limit, page);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getByIdUseCase.execute(id);
  }

  @Post()
  @Auth()
  @ApiBearerAuth()
  async create(
    @Req() request: Request,
    @Body() createDto: CreateInteractionDto,
  ) {
    return await this.createUseCase.execute(
      request.user as TokenPayload,
      createDto,
    );
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  async update(
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateInteractionDto,
  ) {
    return await this.updateUseCase.execute(
      request.user as TokenPayload,
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth()
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
