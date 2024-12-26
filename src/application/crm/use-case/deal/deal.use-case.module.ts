import { Module } from '@nestjs/common';
import { CreateDealUseCase } from './create-deal.use-case';
import { GetAllDealsUseCase } from './get-all-deals.use-case';
import { GetDealByIdUseCase } from './get-deal-by-id.use-case';
import { DeleteDealUseCase } from './delete-deal.use-case';
import { UpdateDealUseCase } from './update-deal.use-case';

@Module({
  providers: [
    CreateDealUseCase,
    GetAllDealsUseCase,
    GetDealByIdUseCase,
    DeleteDealUseCase,
    UpdateDealUseCase,
  ],
  exports: [
    CreateDealUseCase,
    GetAllDealsUseCase,
    GetDealByIdUseCase,
    DeleteDealUseCase,
    UpdateDealUseCase,
  ],
})
export class DealUseCaseModule {}
