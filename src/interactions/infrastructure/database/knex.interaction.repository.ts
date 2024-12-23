import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Interaction } from '@interactions/domain/entities/interaction.entity';
import { IInteractionRepository } from '@interactions/domain/repositories/interaction.repository';

@Injectable()
export class KnexInteractionRepository implements IInteractionRepository {
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

    const data = interactions.map(
      (i) =>
        new Interaction(
          i.id,
          i.customerId,
          i.managerId,
          i.type,
          i.description,
          i.createdAt,
          i.updatedAt,
        ),
    );
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Interaction | null> {
    const interaction = await this.db(this.interactionTable)
      .first<Interaction>()
      .where({ id });

    return interaction
      ? new Interaction(
          interaction.id,
          interaction.customerId,
          interaction.managerId,
          interaction.type,
          interaction.description,
          interaction.createdAt,
          interaction.updatedAt,
        )
      : null;
  }
  async findByCustomer(customerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db(this.interactionTable)
      .select<Interaction[]>()
      .where({ customerId });

    return interactions.length
      ? interactions.map(
          (i) =>
            new Interaction(
              i.id,
              i.customerId,
              i.managerId,
              i.type,
              i.description,
              i.createdAt,
              i.updatedAt,
            ),
        )
      : null;
  }

  async findByManager(managerId: string): Promise<Interaction[] | null> {
    const interactions = await this.db(this.interactionTable)
      .select<Interaction[]>()
      .where({ managerId });

    return interactions.length
      ? interactions.map(
          (i) =>
            new Interaction(
              i.id,
              i.customerId,
              i.managerId,
              i.type,
              i.description,
              i.createdAt,
              i.updatedAt,
            ),
        )
      : null;
  }

  async create(interaction: Interaction): Promise<Interaction> {
    const data: Interaction = {
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
    return new Interaction(
      createdInteraction.id,
      createdInteraction.customerId,
      createdInteraction.managerId,
      createdInteraction.type,
      createdInteraction.description,
      createdInteraction.createdAt,
      createdInteraction.updatedAt,
    );
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
      ? new Interaction(
          updatedInteraction.id,
          updatedInteraction.customerId,
          updatedInteraction.managerId,
          updatedInteraction.type,
          updatedInteraction.description,
          updatedInteraction.createdAt,
          updatedInteraction.updatedAt,
        )
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.interactionTable).delete().where({ id });
  }
}
