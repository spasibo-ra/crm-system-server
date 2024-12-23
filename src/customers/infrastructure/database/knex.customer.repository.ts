import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Customer } from '@customers/domain/entities/customer.entity';
import { ICustomerRepository } from '@customers/domain/repositories/customer.repository';

@Injectable()
export class KnexCustomerRepository implements ICustomerRepository {
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

    const data = customers.map(
      (customer) =>
        new Customer(
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
          customer.createdAt,
          customer.updatedAt,
        ),
    );
    return { data, total: +total[0] };
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.db(this.customerTable)
      .first<Customer>()
      .where({ id });

    return customer
      ? new Customer(
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
          customer.createdAt,
          customer.updatedAt,
        )
      : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.db(this.customerTable)
      .first<Customer>()
      .where({ email });

    return customer
      ? new Customer(
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
          customer.createdAt,
          customer.updatedAt,
        )
      : null;
  }

  async create(customer: Customer): Promise<Customer> {
    const data: Customer = {
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
    return new Customer(
      createdCustomer.id,
      createdCustomer.name,
      createdCustomer.email,
      createdCustomer.phone,
      createdCustomer.createdAt,
      createdCustomer.updatedAt,
    );
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
      ? new Customer(
          updatedCustomer.id,
          updatedCustomer.name,
          updatedCustomer.email,
          updatedCustomer.phone,
          updatedCustomer.createdAt,
          updatedCustomer.updatedAt,
        )
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.customerTable).delete().where({ id });
  }
}
