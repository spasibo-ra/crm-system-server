import { Interaction } from '@app/domain/crm/interaction';

export class KnexInteractionMapper {
  static toDomain(raw: Interaction): Interaction {
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
}
