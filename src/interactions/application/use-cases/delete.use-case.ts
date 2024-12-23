import { Inject, Injectable } from '@nestjs/common';
import { IInteractionRepository } from '@interactions/domain/repositories/interaction.repository';
import { INTERACTIONS_REPOSITORY } from '@shared/constants';

@Injectable()
export class DeleteInteractionUseCase {
  constructor(
    @Inject(INTERACTIONS_REPOSITORY)
    private readonly interactionRepository: IInteractionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.interactionRepository.delete(id);
  }
}
