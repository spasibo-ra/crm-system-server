import { Module } from '@nestjs/common';
import { INTERACTIONS_REPOSITORY } from '@shared/constants';
import { InteractionsController } from './infrastructure/controllers/interactions.controller';
import { KnexInteractionRepository } from './infrastructure/database/knex.interaction.repository';
import {
  CreateInteractionUseCase,
  DeleteInteractionUseCase,
  GetAllInteractionsUseCase,
  GetInteractionByIdUseCase,
  UpdateInteractionUseCase,
} from './application/use-cases';

@Module({
  imports: [],
  providers: [
    { provide: INTERACTIONS_REPOSITORY, useClass: KnexInteractionRepository },
    GetAllInteractionsUseCase,
    GetInteractionByIdUseCase,
    CreateInteractionUseCase,
    UpdateInteractionUseCase,
    DeleteInteractionUseCase,
  ],
  controllers: [InteractionsController],
  exports: [],
})
export class InteractionsModule {}
