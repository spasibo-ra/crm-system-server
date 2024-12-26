import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { InteractionRepository } from '../../ports';
import { Interaction } from '@app/domain/crm/interaction';

interface CreateInteractionUseCaseCommand {
  user: TokenPayload;
  _interaction: Pick<Interaction, 'customerId' | 'type'> &
    Partial<Pick<Interaction, 'description'>>;
}

@Injectable()
export class CreateInteractionUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute({ user, _interaction }: CreateInteractionUseCaseCommand) {
    const interaction = new Interaction({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._interaction,
      managerId: user.id,
    });
    return await this.interactionRepository.create(interaction);
  }
}
