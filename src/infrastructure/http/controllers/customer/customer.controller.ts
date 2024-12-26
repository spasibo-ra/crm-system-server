import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';

import { Auth } from '@common/decorators/auth.decorator';
import {
  GetAllCustomersUseCase,
  GetCustomerByIdUseCase,
  CreateCustomerUseCase,
  UpdateCustomerUseCase,
} from '@app/application/crm/use-case/customer';
import { CreateCustomerDto } from '../../dto/customer/create.customer.dto';
import { UpdateCustomerDto } from '../../dto/customer/update.customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @Get()
  async getAll(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllCustomersUseCase.execute(limit, page);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getCustomerByIdUseCase.execute(id);
  }

  @Post()
  @Auth()
  @ApiBearerAuth()
  async create(@Body() createDto: CreateCustomerDto) {
    return await this.createCustomerUseCase.execute(createDto);
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateCustomerDto,
  ) {
    return await this.updateCustomerUseCase.execute({
      id,
      customer: updateDto,
    });
  }
}
