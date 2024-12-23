import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICustomerRepository } from '@customers/domain/repositories/customer.repository';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';
import { UpdateCustomerDto } from '../dto/update.customer.dto';
import { Customer } from '@customers/domain/entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(id: string, updateDto: UpdateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer)
      throw new NotFoundException(`Customer with ID: ${id} not found`);
    const updatedCustomer = await this.customerRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!updatedCustomer)
      throw new Error(`Failed to update customer with ID ${id}`);

    return updatedCustomer;
  }
}
