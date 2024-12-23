import { Interaction } from '../entities/interaction.entity';

export interface IInteractionRepository {
  findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Interaction[]; total: number }>;
  findById(id: string): Promise<Interaction | null>;
  findByCustomer(customerId: string): Promise<Interaction[] | null>;
  findByManager(managerId: string): Promise<Interaction[] | null>;
  create(interaction: Interaction): Promise<Interaction>;
  update(
    id: string,
    interaction: Partial<Interaction>,
  ): Promise<Interaction | null>;
  delete(id: string): Promise<void>;
}
