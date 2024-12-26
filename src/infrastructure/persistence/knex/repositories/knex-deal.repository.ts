import { Injectable } from '@nestjs/common';
import { Deal, DealProps } from '@app/domain/crm/deal';
import { InjectDB, Knex } from '@shared/knex';
import { DealRepository } from '@app/application/crm/ports';
import { KnexDealMapper } from '../mapper/knex-deal.mapper';

@Injectable()
export class KnexDealRepository implements DealRepository {
  private readonly dealTable: string = 'deals';
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Deal[]; total: number }> {
    const skip = (page - 1) * limit;
    const [deals, total] = await Promise.all([
      this.db(this.dealTable).select<Deal[]>().limit(limit).offset(skip),
      this.db(this.dealTable).count('id'),
    ]);

    const data = deals.map((deal) => KnexDealMapper.toDomain(deal));
    return { data, total: +total[0].count };
  }
  async findById(id: string): Promise<Deal | null> {
    const deal = await this.db(this.dealTable).first<Deal>().where({ id });

    return deal ? KnexDealMapper.toDomain(deal) : null;
  }
  async findByCustomer(customerId: string): Promise<Deal[] | null> {
    const deals = await this.db(this.dealTable)
      .select<Deal[]>()
      .where({ customerId });

    return deals.length
      ? deals.map((deal) => KnexDealMapper.toDomain(deal))
      : null;
  }
  async findByManager(managerId: string): Promise<Deal[] | null> {
    const deals = await this.db(this.dealTable)
      .select<Deal[]>()
      .where({ managerId });

    return deals.length
      ? deals.map((deal) => KnexDealMapper.toDomain(deal))
      : null;
  }
  async create(deal: Deal): Promise<Deal> {
    const data: DealProps = {
      id: deal.id,
      customerId: deal.customerId,
      managerId: deal.managerId,
      title: deal.title,
      description: deal.description,
      status: deal.status,
      stage: deal.stage,
      amount: deal.amount,
      currency: deal.currency,
      closedAt: deal.closedAt,
      createdAt: deal.createdAt,
      updatedAt: deal.updatedAt,
    };

    const [createdDeal] = await this.db(this.dealTable)
      .insert(data)
      .returning<Deal[]>('*');
    return KnexDealMapper.toDomain(createdDeal);
  }
  async update(id: string, deal: Partial<Deal>): Promise<Deal | null> {
    const [updatedDeal] = await this.db(this.dealTable)
      .update(deal)
      .where({ id })
      .returning<Deal[]>('*');
    return updatedDeal ? KnexDealMapper.toDomain(updatedDeal) : null;
  }
  async delete(id: string): Promise<void> {
    await this.db(this.dealTable).delete().where({ id });
  }
}
