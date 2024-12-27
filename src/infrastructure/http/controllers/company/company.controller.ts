import {
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  GetAllCompaniesUseCase,
  GetCompanyByIdUseCase,
  UpdateCompanyUseCase,
} from '@app/application/crm/use-case/company';
import { Auth } from '@common/decorators/auth.decorator';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dto/company';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @Get()
  async getAll(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllCompaniesUseCase.execute(limit, page);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getCompanyByIdUseCase.execute(id);
  }

  @Post()
  @Auth()
  @ApiBearerAuth()
  async create(@Body() createDto: CreateCompanyDto) {
    return await this.createCompanyUseCase.execute(createDto);
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateCompanyDto,
  ) {
    return await this.updateCompanyUseCase.execute({ id, company: updateDto });
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth()
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteCompanyUseCase.execute(id);
  }
}
