import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Customer[]; total: number }>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer | null>;
  delete(id: string): Promise<void>;
}
