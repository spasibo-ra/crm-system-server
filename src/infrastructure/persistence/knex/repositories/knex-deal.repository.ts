import { Injectable } from '@nestjs/common';
import { Deal } from '@app/domain/crm/deal';
import { InjectDB, Knex } from '@shared/knex';
import { DealRepository } from '@app/application/crm/ports';
import { KnexDealMapper } from '../mapper/knex-deal.mapper';

@Injectable()
export class KnexDealRepository implements DealRepository {
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Deal[]; total: number }> {
    const skip = (page - 1) * limit;
    const [deals, total] = await Promise.all([
      this.db('deals').select().limit(limit).offset(skip),
      this.db('deals').count('id'),
    ]);

    const data = deals.map((deal) => KnexDealMapper.toDomain(deal));
    return { data, total: +total[0].count };
  }
  async findById(id: string): Promise<Deal | null> {
    const deal = await this.db('deals').first().where({ id });
    return deal ? KnexDealMapper.toDomain(deal) : null;
  }
  async findByCustomer(customerId: string): Promise<Deal[] | null> {
    const deals = await this.db('deals').select().where({ customerId });

    return deals.length
      ? deals.map((deal) => KnexDealMapper.toDomain(deal))
      : null;
  }
  async findByManager(managerId: string): Promise<Deal[] | null> {
    const deals = await this.db('deals').select().where({ managerId });

    return deals.length
      ? deals.map((deal) => KnexDealMapper.toDomain(deal))
      : null;
  }
  async create(deal: Deal): Promise<Deal> {
    const data = KnexDealMapper.toKnex(deal);
    const [createdDeal] = await this.db('deals').insert(data).returning('*');
    return KnexDealMapper.toDomain(createdDeal);
  }
  async update(id: string, deal: Partial<Deal>): Promise<Deal | null> {
    const [updatedDeal] = await this.db('deals')
      .update(deal)
      .where({ id })
      .returning('*');
    return updatedDeal ? KnexDealMapper.toDomain(updatedDeal) : null;
  }
  async delete(id: string): Promise<void> {
    await this.db('deals').delete().where({ id });
  }
}
