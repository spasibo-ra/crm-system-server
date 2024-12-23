import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CreateInteractionDto } from '../dto';
import { INTERACTIONS_REPOSITORY } from '@shared/constants';
import { IInteractionRepository } from '@interactions/domain/repositories/interaction.repository';
import { Interaction } from '@interactions/domain/entities';
import { TokenPayload } from '@auth/domain/entities/token-payload.interface';

@Injectable()
export class CreateInteractionUseCase {
  constructor(
    @Inject(INTERACTIONS_REPOSITORY)
    private readonly interactionRepository: IInteractionRepository,
  ) {}

  async execute(user: TokenPayload, createDto: CreateInteractionDto) {
    const interaction = new Interaction(
      crypto.randomUUID(),
      createDto.customerId,
      user.id,
      createDto.type,
      createDto.description,
      new Date(),
      new Date(),
    );
    return this.interactionRepository.create(interaction);
  }
}
