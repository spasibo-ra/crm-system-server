import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@app/domain/crm/customer';
import { CustomerRepository } from '../../ports';

interface UpdateCustomerUseCaseCommand {
  id: string;
  customer: Partial<Pick<Customer, 'name' | 'phone'>>;
}

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ id, customer }: UpdateCustomerUseCaseCommand) {
    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer)
      throw new NotFoundException(`Customer with ID: ${id} not found`);
    const updatedCustomer = await this.customerRepository.update(id, {
      ...customer,
      updatedAt: new Date(),
    });
    if (!updatedCustomer)
      throw new Error(`Failed to update customer with ID ${id}`);

    return updatedCustomer;
  }
}
