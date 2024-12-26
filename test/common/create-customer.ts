import { Customer } from '@app/domain/crm/customer';
import { createEntiry } from './db.knex';
import { KnexCustomerMapper } from '@app/infrastructure/persistence/knex/mapper/knex-customer.mapper';

export async function createCustomer(_customer: Customer) {
  const result = await createEntiry('customers', {
    ..._customer.currentState,
  } as Customer);
  return KnexCustomerMapper.toDomain(result);
}
