import { Injectable } from '@nestjs/common';
import { InteractionRepository } from '../../ports';

@Injectable()
export class GetAllInteractionsUseCase {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async execute(limit: number, page: number) {
    return await this.interactionRepository.findAll(limit, page);
  }
}
