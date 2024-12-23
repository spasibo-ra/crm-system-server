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
import {
  CreateCustomerUseCase,
  GetAllCustomersUseCase,
  GetCustomerByIdUseCase,
  UpdateCustomerUseCase,
} from '@customers/application/use-cases';
import { CreateCustomerDto } from '@customers/application/dto/create.customer.dto';
import { UpdateCustomerDto } from '@customers/application/dto/update.customer.dto';
import { Auth } from '@common/decorators/auth.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
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
    return await this.updateCustomerUseCase.execute(id, updateDto);
  }
}
