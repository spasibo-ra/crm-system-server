import { Module } from '@nestjs/common';
import { CreateCompanyUseCase } from './create-company.use-case';
import { GetAllCompaniesUseCase } from './get-all-companies.use-case';
import { GetCompanyByIdUseCase } from './get-company-by-id.use-case';
import { DeleteCompanyUseCase } from './delete-company.use-case';
import { UpdateCompanyUseCase } from './update-company.use-case';

@Module({
  providers: [
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    GetAllCompaniesUseCase,
    GetCompanyByIdUseCase,
    UpdateCompanyUseCase,
  ],
  exports: [
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    GetAllCompaniesUseCase,
    GetCompanyByIdUseCase,
    UpdateCompanyUseCase,
  ],
})
export class CompanyUseCaseModule {}
