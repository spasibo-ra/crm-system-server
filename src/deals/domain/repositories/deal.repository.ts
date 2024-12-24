import { Deal } from '../entities';

export interface IDealRepository {
  findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Deal[]; total: number }>;
  findById(id: string): Promise<Deal | null>;
  findByCustomer(customerId: string): Promise<Deal[] | null>;
  findByManager(managerId: string): Promise<Deal[] | null>;
  create(deal: Deal): Promise<Deal>;
  update(id: string, deal: Partial<Deal>): Promise<Deal | null>;
  delete(id: string): Promise<void>;
}
