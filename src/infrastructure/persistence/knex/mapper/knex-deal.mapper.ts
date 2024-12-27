import { Deal } from '@app/domain/crm/deal';
import { DealTable } from '../types/tables';
export class KnexDealMapper {
  static toDomain(raw: DealTable): Deal {
    const model = new Deal({
      id: raw.id,
      amount: raw.amount,
      createdAt: raw.createdAt,
      currency: raw.currency,
      customerId: raw.customerId,
      managerId: raw.managerId,
      stage: raw.stage,
      status: raw.status,
      title: raw.title,
      updatedAt: raw.updatedAt,
      closedAt: raw.closedAt,
      description: raw.description,
    });
    return model;
  }

  static toKnex(deal: Deal): DealTable {
    return {
      id: deal.id,
      managerId: deal.managerId,
      customerId: deal.customerId,
      title: deal.title,
      status: deal.status,
      stage: deal.stage,
      amount: deal.amount,
      currency: deal.currency,
      description: deal.description,
      closedAt: deal.closedAt,
      createdAt: deal.createdAt,
      updatedAt: deal.updatedAt,
    };
  }
}
