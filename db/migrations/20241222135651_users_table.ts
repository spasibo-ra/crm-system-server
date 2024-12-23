import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('email', 25).unique().notNullable();
    t.string('password', 255).notNullable();
    t.string('name', 25).notNullable();
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
