import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Customer, CustomerProps } from '@app/domain/crm/customer';
import { CustomerRepository } from '@app/application/crm/ports/customer.repository';
import { KnexCustomerMapper } from '../mapper/knex-customer.mapper';

@Injectable()
export class KnexCustomerRepository implements CustomerRepository {
  private readonly customerTable: string = 'customers';
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Customer[]; total: number }> {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      this.db(this.customerTable)
        .select<Customer[]>()
        .limit(limit)
        .offset(skip),
      this.db(this.customerTable).count('id'),
    ]);

    const data = customers.map((customer) =>
      KnexCustomerMapper.toDomain(customer),
    );
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.db(this.customerTable)
      .first<Customer>()
      .where({ id });

    return customer ? KnexCustomerMapper.toDomain(customer) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.db(this.customerTable)
      .first<Customer>()
      .where({ email });

    return customer ? KnexCustomerMapper.toDomain(customer) : null;
  }

  async create(customer: Customer): Promise<Customer> {
    const data: CustomerProps = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
    const [createdCustomer] = await this.db(this.customerTable)
      .insert(data)
      .returning<Customer[]>('*');
    return KnexCustomerMapper.toDomain(createdCustomer);
  }

  async update(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer | null> {
    const [updatedCustomer] = await this.db(this.customerTable)
      .update(customer)
      .where({ id })
      .returning<Customer[]>('*');
    return updatedCustomer
      ? KnexCustomerMapper.toDomain(updatedCustomer)
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.customerTable).delete().where({ id });
  }
}
