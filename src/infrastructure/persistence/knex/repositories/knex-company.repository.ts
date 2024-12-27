import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Company } from '@app/domain/crm/company';
import { CompanyRepository } from '@app/application/crm/ports';
import { KnexCompanyMapper } from '../mapper';

@Injectable()
export class KnexCompanyRepository implements CompanyRepository {
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Company[]; total: number }> {
    const skip = (page - 1) * limit;
    const [companies, total] = await Promise.all([
      this.db('companies').select().limit(limit).offset(skip),
      this.db('companies').count('id'),
    ]);

    const data = companies.map((company) =>
      KnexCompanyMapper.toDomain(company),
    );
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Company | null> {
    const customer = await this.db('companies').first().where({ id });
    return customer ? KnexCompanyMapper.toDomain(customer) : null;
  }

  async create(company: Company): Promise<Company> {
    const data = KnexCompanyMapper.toKnex(company);
    const [createdCompany] = await this.db('companies')
      .insert(data)
      .returning('*');
    return KnexCompanyMapper.toDomain(createdCompany);
  }

  async update(id: string, company: Partial<Company>): Promise<Company | null> {
    const [updatedCompany] = await this.db('companies')
      .update(company)
      .where({ id })
      .returning('*');
    return updatedCompany ? KnexCompanyMapper.toDomain(updatedCompany) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db('companies').delete().where({ id });
  }
}
