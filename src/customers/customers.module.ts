import { Module } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';
import { CustomersController } from './infrastructure/controllers/customers.controller';
import { KnexCustomerRepository } from './infrastructure/database/knex.customer.repository';
import {
  CreateCustomerUseCase,
  GetAllCustomersUseCase,
  GetCustomerByIdUseCase,
  UpdateCustomerUseCase,
} from './application/use-cases';

@Module({
  imports: [],
  providers: [
    { provide: CUSTOMERS_REPOSITORY, useClass: KnexCustomerRepository },
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetCustomerByIdUseCase,
    GetAllCustomersUseCase,
  ],
  controllers: [CustomersController],
  exports: [],
})
export class CustomersModule {}
