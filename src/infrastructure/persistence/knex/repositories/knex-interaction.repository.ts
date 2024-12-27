import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Interaction } from '@app/domain/crm/interaction';
import { InteractionRepository } from '@app/application/crm/ports';
import { KnexInteractionMapper } from '../mapper';

@Injectable()
export class KnexInteractionRepository implements InteractionRepository {
  private readonly interactionTable: string = 'interactions';
  constructor(@InjectDB() private readonly db: Knex) {}

  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Interaction[]; total: number }> {
    const skip = (page - 1) * limit;
    const [interactions, total] = await Promise.all([
      this.db('interactions').select().limit(limit).offset(skip),
      this.db('interactions').count('id'),
    ]);

    const data = interactions.map((i) => KnexInteractionMapper.toDomain(i));
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Interaction | null> {
    const interaction = await this.db('interactions').first().where({ id });
    return interaction ? KnexInteractionMapper.toDomain(interaction) : null;
  }
  async findByCustomer(customerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db('interactions')
      .select()
      .where({ customerId });

    return interactions.length
      ? interactions.map((i) => KnexInteractionMapper.toDomain(i))
      : null;
  }

  async findByManager(managerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db('interactions')
      .select()
      .where({ managerId });

    return interactions.length
      ? interactions.map((i) => KnexInteractionMapper.toDomain(i))
      : null;
  }

  async create(interaction: Interaction): Promise<Interaction> {
    const data = KnexInteractionMapper.toKnex(interaction);
    const [createdInteraction] = await this.db('interactions')
      .insert(data)
      .returning('*');
    return KnexInteractionMapper.toDomain(createdInteraction);
  }

  async update(
    id: string,
    interaction: Partial<Interaction>,
  ): Promise<Interaction | null> {
    const [updatedInteraction] = await this.db('interactions')
      .update(interaction)
      .where({ id })
      .returning('*');
    return updatedInteraction
      ? KnexInteractionMapper.toDomain(updatedInteraction)
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db('interactions').delete().where({ id });
  }
}
