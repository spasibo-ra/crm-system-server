import { Injectable } from '@nestjs/common';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';
import { Deal } from '@deals/domain/entities';
import { InjectDB, Knex } from '@shared/knex';

@Injectable()
export class KnexDealRepository implements IDealRepository {
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

    const data = deals.map(
      (d) =>
        new Deal(
          d.id,
          d.customerId,
          d.managerId,
          d.title,
          d.description,
          d.status,
          d.stage,
          d.amount,
          d.currency,
          d.closedAt,
          d.createdAt,
          d.updatedAt,
        ),
    );
    return { data, total: +total[0].count };
  }
  async findById(id: string): Promise<Deal | null> {
    const deal = await this.db(this.dealTable).first<Deal>().where({ id });

    return deal
      ? new Deal(
          deal.id,
          deal.customerId,
          deal.managerId,
          deal.title,
          deal.description,
          deal.status,
          deal.stage,
          deal.amount,
          deal.currency,
          deal.closedAt,
          deal.createdAt,
          deal.updatedAt,
        )
      : null;
  }
  async findByCustomer(customerId: string): Promise<Deal[] | null> {
    const deals = await this.db(this.dealTable)
      .select<Deal[]>()
      .where({ customerId });

    return deals.length
      ? deals.map(
          (d) =>
            new Deal(
              d.id,
              d.customerId,
              d.managerId,
              d.title,
              d.description,
              d.status,
              d.stage,
              d.amount,
              d.currency,
              d.closedAt,
              d.createdAt,
              d.updatedAt,
            ),
        )
      : null;
  }
  async findByManager(managerId: string): Promise<Deal[] | null> {
    const deals = await this.db(this.dealTable)
      .select<Deal[]>()
      .where({ managerId });

    return deals.length
      ? deals.map(
          (d) =>
            new Deal(
              d.id,
              d.customerId,
              d.managerId,
              d.title,
              d.description,
              d.status,
              d.stage,
              d.amount,
              d.currency,
              d.closedAt,
              d.createdAt,
              d.updatedAt,
            ),
        )
      : null;
  }
  async create(deal: Deal): Promise<Deal> {
    const data: Deal = {
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
    return new Deal(
      createdDeal.id,
      createdDeal.customerId,
      createdDeal.managerId,
      createdDeal.title,
      createdDeal.description,
      createdDeal.status,
      createdDeal.stage,
      createdDeal.amount,
      createdDeal.currency,
      createdDeal.closedAt,
      createdDeal.createdAt,
      createdDeal.updatedAt,
    );
  }
  async update(id: string, deal: Partial<Deal>): Promise<Deal | null> {
    const [updatedDeal] = await this.db(this.dealTable)
      .update(deal)
      .where({ id })
      .returning<Deal[]>('*');
    return updatedDeal
      ? new Deal(
          updatedDeal.id,
          updatedDeal.customerId,
          updatedDeal.managerId,
          updatedDeal.title,
          updatedDeal.description,
          updatedDeal.status,
          updatedDeal.stage,
          updatedDeal.amount,
          updatedDeal.currency,
          updatedDeal.closedAt,
          updatedDeal.createdAt,
          updatedDeal.updatedAt,
        )
      : null;
  }
  async delete(id: string): Promise<void> {
    await this.db(this.dealTable).delete().where({ id });
  }
}
