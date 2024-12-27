import { Interaction } from '@app/domain/crm/interaction';
import { InteractionTable } from '../types/tables';
export class KnexInteractionMapper {
  static toDomain(raw: InteractionTable): Interaction {
    const model = new Interaction({
      id: raw.id,
      createdAt: raw.createdAt,
      customerId: raw.customerId,
      managerId: raw.managerId,
      type: raw.type,
      updatedAt: raw.updatedAt,
      description: raw.description,
    });
    return model;
  }

  static toKnex(interaction: Interaction): InteractionTable {
    return {
      id: interaction.id,
      managerId: interaction.managerId,
      customerId: interaction.customerId,
      type: interaction.type,
      description: interaction.description,
      createdAt: interaction.createdAt,
      updatedAt: interaction.updatedAt,
    };
  }
}
