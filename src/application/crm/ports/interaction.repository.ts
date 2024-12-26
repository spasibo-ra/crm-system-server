import { Interaction } from '@app/domain/crm/interaction';

export abstract class InteractionRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Interaction[]; total: number }>;
  abstract findById(id: string): Promise<Interaction | null>;
  abstract findByCustomer(customerId: string): Promise<Interaction[] | null>;
  abstract findByManager(managerId: string): Promise<Interaction[] | null>;
  abstract create(interaction: Interaction): Promise<Interaction>;
  abstract update(
    id: string,
    interaction: Partial<Interaction>,
  ): Promise<Interaction | null>;
  abstract delete(id: string): Promise<void>;
}
