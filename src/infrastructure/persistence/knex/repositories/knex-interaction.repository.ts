import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Interaction, InteractionProps } from '@app/domain/crm/interaction';
import { InteractionRepository } from '@app/application/crm/ports';
import { KnexInteractionMapper } from '../mapper/knex-interaction.mapper';

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
      this.db(this.interactionTable)
        .select<Interaction[]>()
        .limit(limit)
        .offset(skip),
      this.db(this.interactionTable).count('id'),
    ]);

    const data = interactions.map((i) => KnexInteractionMapper.toDomain(i));
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Interaction | null> {
    const interaction = await this.db(this.interactionTable)
      .first<Interaction>()
      .where({ id });

    return interaction ? KnexInteractionMapper.toDomain(interaction) : null;
  }
  async findByCustomer(customerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db(this.interactionTable)
      .select<Interaction[]>()
      .where({ customerId });

    return interactions.length
      ? interactions.map((i) => KnexInteractionMapper.toDomain(i))
      : null;
  }

  async findByManager(managerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db(this.interactionTable)
      .select<Interaction[]>()
      .where({ managerId });

    return interactions.length
      ? interactions.map((i) => KnexInteractionMapper.toDomain(i))
      : null;
  }

  async create(interaction: Interaction): Promise<Interaction> {
    const data: InteractionProps = {
      id: interaction.id,
      customerId: interaction.customerId,
      managerId: interaction.managerId,
      type: interaction.type,
      description: interaction.description,
      createdAt: interaction.createdAt,
      updatedAt: interaction.updatedAt,
    };

    const [createdInteraction] = await this.db(this.interactionTable)
      .insert(data)
      .returning<Interaction[]>('*');
    return KnexInteractionMapper.toDomain(createdInteraction);
  }

  async update(
    id: string,
    interaction: Partial<Interaction>,
  ): Promise<Interaction | null> {
    const [updatedInteraction] = await this.db(this.interactionTable)
      .update(interaction)
      .where({ id })
      .returning<Interaction[]>('*');
    return updatedInteraction
      ? KnexInteractionMapper.toDomain(updatedInteraction)
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.interactionTable).delete().where({ id });
  }
}
