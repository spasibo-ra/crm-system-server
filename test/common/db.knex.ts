import * as knex from 'knex';

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

export const db = knex({
  client: 'pg',
  connection: {
    host: PGHOST,
    port: parseInt(PGPORT, 10),
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
