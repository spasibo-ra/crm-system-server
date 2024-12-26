import { Injectable } from '@nestjs/common';
import { InteractionRepository } from '../../ports';

@Injectable()
export class GetInteractionByIdUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(id: string) {
    return await this.interactionRepository.findById(id);
  }
}
