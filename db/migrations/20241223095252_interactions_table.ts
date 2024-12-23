import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE InteractionType AS ENUM ('call', 'email', 'meeting', 'follow_up', 'presentation');
    `);
  await knex.schema.createTable('interactions', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('customerId')
      .references('id')
      .inTable('customers')
      .onDelete('CASCADE');
    t.uuid('managerId').references('id').inTable('users').onDelete('CASCADE');
    t.specificType('type', 'InteractionType').defaultTo('email');
    t.text('description');
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('interactions');
  await knex.schema.raw(`
    DROP TYPE InteractionType;
    `);
}
