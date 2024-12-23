import * as crypto from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';

import { Customer } from '@customers/domain/entities/customer.entity';
import { ICustomerRepository } from '@customers/domain/repositories/customer.repository';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';
import { CreateCustomerDto } from '../dto/create.customer.dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(customerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer(
      crypto.randomUUID(),
      customerDto.name,
      customerDto.email,
      customerDto.phone,
      new Date(),
      new Date(),
    );
    return this.customerRepository.create(customer);
  }
}
