import { Module } from '@nestjs/common';
import { CreateInteractionUseCase } from './create-interaction.use-case';
import { GetAllInteractionsUseCase } from './get-all-interactions.use-case';
import { GetInteractionByIdUseCase } from './get-interaction-by-id.use-case';
import { DeleteInteractionUseCase } from './delete-interaction.use-case';
import { UpdateInteractionUseCase } from './update-interaction.use-case';

@Module({
  providers: [
    CreateInteractionUseCase,
    DeleteInteractionUseCase,
    GetAllInteractionsUseCase,
    GetInteractionByIdUseCase,
    UpdateInteractionUseCase,
  ],
  exports: [
    CreateInteractionUseCase,
    DeleteInteractionUseCase,
    GetAllInteractionsUseCase,
    GetInteractionByIdUseCase,
    UpdateInteractionUseCase,
  ],
})
export class InteractionUseCaseModule {}
