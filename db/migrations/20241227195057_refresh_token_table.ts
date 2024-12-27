import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refresh_token', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.string('token').notNullable();
    t.timestamp('expiresAt').notNullable();
    t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refresh_token');
}
