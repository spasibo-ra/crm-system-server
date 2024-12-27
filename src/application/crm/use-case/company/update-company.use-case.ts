import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from '@app/domain/crm/company';
import { CompanyRepository } from '../../ports';

interface UpdateCompanyUseCaseCommand {
  id: string;
  company: Partial<Pick<Company, 'industry' | 'name'>>;
}

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    id,
    company,
  }: UpdateCompanyUseCaseCommand): Promise<Company> {
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany)
      throw new NotFoundException(`Company with ID: ${id} not found`);
    const updatedCompany = await this.companyRepository.update(id, {
      ...company,
      updatedAt: new Date(),
    });
    if (!updatedCompany)
      throw new Error(`Failed to update company with ID ${id}`);
    return updatedCompany;
  }
}
