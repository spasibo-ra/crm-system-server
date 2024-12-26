import { Deal } from '@app/domain/crm/deal';

export abstract class DealRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Deal[]; total: number }>;
  abstract findById(id: string): Promise<Deal | null>;
  abstract findByCustomer(customerId: string): Promise<Deal[] | null>;
  abstract findByManager(managerId: string): Promise<Deal[] | null>;
  abstract create(deal: Deal): Promise<Deal>;
  abstract update(id: string, deal: Partial<Deal>): Promise<Deal | null>;
  abstract delete(id: string): Promise<void>;
}
