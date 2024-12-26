import { Deal } from '@app/domain/crm/deal';

export class KnexDealMapper {
  static toDomain(raw: Deal): Deal {
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
}
