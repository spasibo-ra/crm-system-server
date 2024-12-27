import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE TaskStatus AS ENUM ('pending', 'in_progress', 'completed');
  `);
  await knex.schema.createTable('tasks', function (t) {
    t.uuid('id').primary().defaultTo(knex.fn.uuid());
    t.uuid('managerId').references('id').inTable('users').onDelete('SET NULL');
    t.uuid('customerId')
      .references('id')
      .inTable('customers')
      .onDelete('SET NULL');
    t.uuid('dealId').references('id').inTable('deals').onDelete('SET NULL');
    t.string('title', 255).notNullable();
    t.text('description');
    t.specificType('status', 'TaskStatus').defaultTo('pending');
    t.timestamp('dueDate').nullable();
    t.timestamp('completedAt').nullable();
    t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
  await knex.schema.raw(`
    DROP TYPE TaskStatus;
  `);
}
