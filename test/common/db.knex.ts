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

export async function deleteAllRecords(table: string) {
  await db.raw(`DELETE FROM ${table} WHERE TRUE;`);
}

export async function createEntiry<T>(table: string, data: T): Promise<T> {
  const [newData] = await db(table).insert(data).returning<T[]>('*');
  return newData as T;
}
