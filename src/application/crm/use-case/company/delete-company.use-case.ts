import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../ports';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string) {
    return await this.companyRepository.delete(id);
  }
}
