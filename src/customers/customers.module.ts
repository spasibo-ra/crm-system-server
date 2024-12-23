import { Module } from '@nestjs/common';
import { CustomersController } from './infrastructure/controllers/customers.controller';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';
import { KnexCustomerRepository } from './infrastructure/database/knex.customer.repository';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.use-case';

@Module({
  imports: [],
  providers: [
    { provide: CUSTOMERS_REPOSITORY, useClass: KnexCustomerRepository },
    CreateCustomerUseCase,
  ],
  controllers: [CustomersController],
  exports: [],
})
export class CustomersModule {}
