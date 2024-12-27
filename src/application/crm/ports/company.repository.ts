import { Company } from '@app/domain/crm/company';

export abstract class CompanyRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Company[]; total: number }>;
  abstract findById(id: string): Promise<Company | null>;
  abstract create(company: Company): Promise<Company>;
  abstract update(
    id: string,
    company: Partial<Company>,
  ): Promise<Company | null>;
  abstract delete(id: string): Promise<void>;
}
