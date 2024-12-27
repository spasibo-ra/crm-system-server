import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Customer } from '@app/domain/crm/customer';
import { CustomerRepository } from '@app/application/crm/ports/customer.repository';
import { KnexCustomerMapper } from '../mapper';

@Injectable()
export class KnexCustomerRepository implements CustomerRepository {
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Customer[]; total: number }> {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      this.db('customers').select().limit(limit).offset(skip),
      this.db('customers').count('id'),
    ]);

    const data = customers.map((customer) =>
      KnexCustomerMapper.toDomain(customer),
    );
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.db('customers').first().where({ id });
    return customer ? KnexCustomerMapper.toDomain(customer) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.db('customers').first().where({ email });
    return customer ? KnexCustomerMapper.toDomain(customer) : null;
  }

  async create(customer: Customer): Promise<Customer> {
    const data = KnexCustomerMapper.toKnex(customer);
    const [createdCustomer] = await this.db('customers')
      .insert(data)
      .returning('*');
    return KnexCustomerMapper.toDomain(createdCustomer);
  }

  async update(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer | null> {
    const [updatedCustomer] = await this.db('customers')
      .update(customer)
      .where({ id })
      .returning('*');
    return updatedCustomer
      ? KnexCustomerMapper.toDomain(updatedCustomer)
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db('customers').delete().where({ id });
  }
}
