import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE DealStatus AS ENUM ('open', 'in_progress', 'closed');
    CREATE TYPE DealStage AS ENUM ('initial', 'discussion', 'negotiation', 'success', 'failure');
    `);
  await knex.schema.createTable('deals', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('customerId')
      .references('id')
      .inTable('customers')
      .onDelete('CASCADE');
    t.uuid('managerId').references('id').inTable('users').onDelete('CASCADE');
    t.string('title', 255).notNullable();
    t.text('description');
    t.specificType('status', 'DealStatus').defaultTo('open');
    t.specificType('stage', 'DealStage').defaultTo('initial');
    t.decimal('amount', 15, 2);
    t.string('currency', 10).defaultTo('USD');
    t.timestamp('closedAt').nullable();
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deals');
  await knex.schema.raw(`
    DROP TYPE DealStatus;
    DROP TYPE DealStage;
    `);
}
