import { Customer } from '@app/domain/crm/customer';
import { CustomerTable } from '../types/tables';
export class KnexCustomerMapper {
  static toDomain(raw: CustomerTable): Customer {
    const model = new Customer({
      id: raw.id,
      createdAt: raw.createdAt,
      email: raw.email,
      name: raw.name,
      updatedAt: raw.updatedAt,
      phone: raw.phone,
    });
    return model;
  }

  static toKnex(customer: Customer): CustomerTable {
    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.createdAt,
    };
  }
}
