import { Knex } from 'knex';

export async function deleteAllUsers(db: Knex): Promise<void> {
  await db.raw('DELETE FROM users WHERE TRUE;');
}
