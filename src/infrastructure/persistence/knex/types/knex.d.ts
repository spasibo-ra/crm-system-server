import {
  UserTable,
  CustomerTable,
  InteractionTable,
  DealTable,
  CompanyTable,
  ContactTable,
  TaskTable,
  RefreshTokenTable,
} from './tables';

declare module 'knex/types/tables' {
  interface Tables {
    users: UserTable;
    customers: CustomerTable;
    interactions: InteractionTable;
    deals: DealTable;
    companies: CompanyTable;
    contacts: ContactTable;
    tasks: TaskTable;
    refresh_token: RefreshTokenTable;
  }
}
