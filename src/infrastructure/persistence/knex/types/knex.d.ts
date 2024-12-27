import {
  UserTable,
  CustomerTable,
  InteractionTable,
  DealTable,
  CompanyTable,
  ContactTable,
  TaskTable,
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
  }
}
