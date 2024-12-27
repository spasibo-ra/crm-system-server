import { Company } from '@app/domain/crm/company';
import { CompanyTable } from '../types/tables';
export class KnexCompanyMapper {
  static toDomain(raw: CompanyTable): Company {
    const model = new Company({
      id: raw.id,
      name: raw.name,
      industry: raw.industry,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return model;
  }

  static toKnex(company: Company): CompanyTable {
    return {
      id: company.id,
      name: company.name,
      industry: company.industry,
      createdAt: company.createdAt,
      updatedAt: company.createdAt,
    };
  }
}
