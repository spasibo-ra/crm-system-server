import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Interaction } from '@app/domain/crm/interaction';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { InteractionRepository } from '../../ports';

interface UpdateInteractionUseCaseCommand {
  user: TokenPayload;
  id: string;
  interaction: Partial<
    Pick<Interaction, 'customerId' | 'description' | 'type'>
  >;
}

@Injectable()
export class UpdateInteractionUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute({
    user,
    id,
    interaction,
  }: UpdateInteractionUseCaseCommand): Promise<Interaction> {
    const existingInteraction = await this.interactionRepository.findById(id);
    if (!existingInteraction)
      throw new NotFoundException(`Interaction with ID: ${id} not found`);
    if (existingInteraction.managerId !== user.id)
      throw new NotAcceptableException();
    const updatedInteraction = await this.interactionRepository.update(id, {
      ...interaction,
      updatedAt: new Date(),
    });
    if (!updatedInteraction)
      throw new Error(`Failed to update interaction with ID ${id}`);
    return updatedInteraction;
  }
}
