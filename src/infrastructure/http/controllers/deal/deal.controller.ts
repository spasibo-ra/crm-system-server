import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetAllDealsUseCase,
  CreateDealUseCase,
  DeleteDealUseCase,
  GetDealByIdUseCase,
  UpdateDealUseCase,
} from '@app/application/crm/use-case/deal';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import { CreateDealDto } from '../../dto/deal';
import { Request } from 'express';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { Auth } from '@common/decorators/auth.decorator';

@ApiTags('Deals')
@Controller('deals')
export class DealController {
  constructor(
    private readonly getAllDealsUseCase: GetAllDealsUseCase,
    private readonly getDealByIdUseCase: GetDealByIdUseCase,
    private readonly createDealUseCase: CreateDealUseCase,
    private readonly updateDealUseCase: UpdateDealUseCase,
    private readonly deleteDealUseCase: DeleteDealUseCase,
  ) {}

  @Get()
  async getAll(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllDealsUseCase.execute(limit, page);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getDealByIdUseCase.execute(id);
  }

  @Post()
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async create(@Req() req: Request, @Body() createDto: CreateDealDto) {
    const user = req.user as TokenPayload;
    return await this.createDealUseCase.execute({
      user,
      _deal: { ...createDto, stage: 'initial', status: 'open' },
    });
  }

  @Patch(':id')
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: CreateDealDto,
  ) {
    return await this.updateDealUseCase.execute({ id, deal: updateDto });
  }

  @Delete(':id')
  @Auth('admin', 'manager')
  @ApiBearerAuth()
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteDealUseCase.execute(id);
  }
}
