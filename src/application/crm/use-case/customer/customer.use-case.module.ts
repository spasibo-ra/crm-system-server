import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { GetAllCustomersUseCase } from './get-all-customers.use-case';
import { GetCustomerByIdUseCase } from './get-customer-by-id.use-case';
import { UpdateCustomerUseCase } from './update-customer.use-case';

@Module({
  providers: [
    CreateCustomerUseCase,
    GetAllCustomersUseCase,
    GetCustomerByIdUseCase,
    UpdateCustomerUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    GetAllCustomersUseCase,
    GetCustomerByIdUseCase,
    UpdateCustomerUseCase,
  ],
})
export class CustomerUseCaseModule {}
