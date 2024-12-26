import { Customer } from '@app/domain/crm/customer';

export class KnexCustomerMapper {
  static toDomain(raw: Customer): Customer {
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
}
