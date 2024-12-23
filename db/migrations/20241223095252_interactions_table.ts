import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('interactions', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('customerId')
      .references('id')
      .inTable('customers')
      .onDelete('CASCADE');
    t.uuid('managerId').references('id').inTable('users').onDelete('CASCADE');
    t.string('type', 50).notNullable();
    t.text('description');
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('interactions');
}
