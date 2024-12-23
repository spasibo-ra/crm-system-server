import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('email', 50).unique().notNullable();
    t.string('phone', 50).nullable().defaultTo(null);
    t.string('name', 50).notNullable();
    t.string('segment', 50);
    t.uuid('managerId').references('id').inTable('users').onDelete('CASCADE');
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('customers');
}
