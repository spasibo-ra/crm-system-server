import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { Customer } from '@app/domain/crm/customer';
import { CustomerRepository } from '../../ports';

interface CreateCustomerUseCaseCommand {
  email: string;
  name: string;
  phone?: string;
}

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(_customer: CreateCustomerUseCaseCommand): Promise<Customer> {
    const customer = new Customer({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._customer,
    });
    return await this.customerRepository.create(customer);
  }
}
