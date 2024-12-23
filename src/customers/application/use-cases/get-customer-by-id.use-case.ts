import { Customer } from '@customers/domain/entities/customer.entity';
import { ICustomerRepository } from '@customers/domain/repositories/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(id: string): Promise<Customer> {
    return await this.customerRepository.findById(id);
  }
}
