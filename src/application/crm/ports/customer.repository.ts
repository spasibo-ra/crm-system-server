import { Customer } from '@app/domain/crm/customer';

export abstract class CustomerRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Customer[]; total: number }>;
  abstract findById(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract create(customer: Customer): Promise<Customer>;
  abstract update(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer | null>;
  abstract delete(id: string): Promise<void>;
}
