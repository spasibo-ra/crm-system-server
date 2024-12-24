import { Module } from '@nestjs/common';
import { DealsController } from './infrastructure/controllers/deals.controller';
import { DEALS_REPOSITORY } from '@shared/constants';
import { KnexDealRepository } from './infrastructure/database/knex.deal.repository';
import {
  CreateDealUseCase,
  DeleteDealUseCase,
  GetAllDealsUseCase,
  GetDealByIdUseCase,
  UpdateDealUseCase,
} from './application/use-cases';

@Module({
  providers: [
    { provide: DEALS_REPOSITORY, useClass: KnexDealRepository },
    GetAllDealsUseCase,
    GetDealByIdUseCase,
    CreateDealUseCase,
    UpdateDealUseCase,
    DeleteDealUseCase,
  ],
  controllers: [DealsController],
})
export class DealsModule {}
