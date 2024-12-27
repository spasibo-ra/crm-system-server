import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../ports';

@Injectable()
export class GetAllCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(limit: number, page: number) {
    return await this.companyRepository.findAll(limit, page);
  }
}
