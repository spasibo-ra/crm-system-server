import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../ports';

@Injectable()
export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string) {
    return await this.customerRepository.findById(id);
  }
}
