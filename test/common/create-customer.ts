import { Customer } from '@app/domain/crm/customer';
import { createEntiry } from './db.knex';
import { KnexCustomerMapper } from '@app/infrastructure/persistence/knex/mapper/knex-customer.mapper';

export async function createCustomer(_customer: Customer) {
  const data = KnexCustomerMapper.toKnex(_customer);
  const result = await createEntiry('customers', data);
  return KnexCustomerMapper.toDomain(result);
}
