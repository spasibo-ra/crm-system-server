import { Inject, Injectable } from '@nestjs/common';
import { IInteractionRepository } from '@interactions/domain/repositories/interaction.repository';
import { INTERACTIONS_REPOSITORY } from '@shared/constants';

Injectable();
export class GetAllInteractionsUseCase {
  constructor(
    @Inject(INTERACTIONS_REPOSITORY)
    private readonly interactionRepository: IInteractionRepository,
  ) {}

  async execute(limit: number, page: number) {
    return await this.interactionRepository.findAll(limit, page);
  }
}
