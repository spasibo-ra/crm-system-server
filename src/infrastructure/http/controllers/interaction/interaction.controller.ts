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
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { Auth } from '@common/decorators/auth.decorator';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import {
  CreateInteractionDto,
  UpdateInteractionDto,
} from '../../dto/interaction';
import {
  CreateInteractionUseCase,
  DeleteInteractionUseCase,
  GetAllInteractionsUseCase,
  GetInteractionByIdUseCase,
  UpdateInteractionUseCase,
} from '@app/application/crm/use-case/interaction';

@ApiTags('Interactions')
@Controller('interactions')
export class InteractionController {
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
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async create(
    @Req() request: Request,
    @Body() createDto: CreateInteractionDto,
  ) {
    return await this.createUseCase.execute({
      user: request.user as TokenPayload,
      _interaction: createDto,
    });
  }

  @Patch(':id')
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async update(
    @Req() request: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateInteractionDto,
  ) {
    return await this.updateUseCase.execute({
      user: request.user as TokenPayload,
      id,
      interaction: updateDto,
    });
  }

  @Delete(':id')
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
