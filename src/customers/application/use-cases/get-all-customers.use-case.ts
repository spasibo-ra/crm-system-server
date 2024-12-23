import { Customer } from '@customers/domain/entities/customer.entity';
import { ICustomerRepository } from '@customers/domain/repositories/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY } from '@shared/constants';

@Injectable()
export class GetAllCustomersUseCase {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(
    limit: number,
    page: number,
  ): Promise<{ data: Customer[]; total: number }> {
    return await this.customerRepository.findAll(limit, page);
  }
}
