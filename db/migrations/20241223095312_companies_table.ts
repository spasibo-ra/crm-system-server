import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('companies', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('name', 50).notNullable();
    t.string('industry', 255);
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('companies');
}
