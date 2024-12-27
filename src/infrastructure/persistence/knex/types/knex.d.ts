import {
  UserTable,
  CustomerTable,
  InteractionTable,
  DealTable,
} from './tables';

declare module 'knex/types/tables' {
  interface Tables {
    users: UserTable;
    customers: CustomerTable;
    interactions: InteractionTable;
    deals: DealTable;
  }
}
