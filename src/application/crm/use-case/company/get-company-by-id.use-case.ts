import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../ports';

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string) {
    return await this.companyRepository.findById(id);
  }
}
