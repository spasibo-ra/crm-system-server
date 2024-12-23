import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { INTERACTIONS_REPOSITORY } from '@shared/constants';
import { Interaction } from '@interactions/domain/entities';
import { IInteractionRepository } from '@interactions/domain/repositories/interaction.repository';
import { UpdateInteractionDto } from '../dto';
import { TokenPayload } from '@auth/domain/entities/token-payload.interface';

@Injectable()
export class UpdateInteractionUseCase {
  constructor(
    @Inject(INTERACTIONS_REPOSITORY)
    private readonly interactionRepository: IInteractionRepository,
  ) {}

  async execute(
    user: TokenPayload,
    id: string,
    updateDto: UpdateInteractionDto,
  ): Promise<Interaction> {
    const existingInteraction = await this.interactionRepository.findById(id);
    if (!existingInteraction)
      throw new NotFoundException(`Interaction with ID: ${id} not found`);
    if (existingInteraction.managerId !== user.id)
      throw new NotAcceptableException();
    const updatedInteraction = await this.interactionRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!updatedInteraction)
      throw new Error(`Failed to update interaction with ID ${id}`);
    return updatedInteraction;
  }
}
