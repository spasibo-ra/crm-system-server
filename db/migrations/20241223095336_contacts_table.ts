import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contacts', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.string('firstName', 50).notNullable();
    t.string('lastName', 50);
    t.string('email', 255).unique();
    t.string('phone', 50);
    t.uuid('companyId')
      .references('id')
      .inTable('companies')
      .onDelete('SET NULL');
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contacts');
}
