import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../ports';

@Injectable()
export class GetAllCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(limit: number, page: number) {
    return await this.customerRepository.findAll(limit, page);
  }
}
