import { Injectable } from '@nestjs/common';
import { InteractionRepository } from '../../ports';

@Injectable()
export class DeleteInteractionUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(id: string) {
    //TODO: add logic for check access
    return await this.interactionRepository.delete(id);
  }
}
