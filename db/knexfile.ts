import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'spasibo',
      password: 'Qwerty123',
      database: 'crm',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

module.exports = config;
