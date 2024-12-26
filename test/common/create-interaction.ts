import { Interaction } from '@app/domain/crm/interaction';
import { createEntiry } from './db.knex';
import { KnexInteractionMapper } from '@app/infrastructure/persistence/knex/mapper/knex-interaction.mapper';

export async function createInteraction(_interaction: Interaction) {
  const result = await createEntiry('interactions', {
    ..._interaction.currentState,
  } as Interaction);
  return KnexInteractionMapper.toDomain(result);
}
