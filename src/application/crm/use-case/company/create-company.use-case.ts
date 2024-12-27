import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CompanyRepository } from '../../ports';
import { Company } from '@app/domain/crm/company';

interface CreateCompanyUseCaseCommand {
  name: string;
  industry: string;
}

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(_company: CreateCompanyUseCaseCommand) {
    const company = new Company({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._company,
    });
    return await this.companyRepository.create(company);
  }
}
