import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { Contact } from '@app/domain/crm/contact';
import { KnexContactMapper } from '../mapper';
import { ContactRepository } from '@app/application/crm/ports';

@Injectable()
export class KnexContactRepository implements ContactRepository {
  constructor(@InjectDB() private readonly db: Knex) {}
  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Contact[]; total: number }> {
    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      this.db('contacts').select().limit(limit).offset(skip),
      this.db('contacts').count('id'),
    ]);

    const data = contacts.map((contact) => KnexContactMapper.toDomain(contact));
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = await this.db('contacts').first().where({ id });
    return contact ? KnexContactMapper.toDomain(contact) : null;
  }

  async findByEmail(email: string): Promise<Contact | null> {
    const contact = await this.db('contacts').first().where({ email });
    return contact ? KnexContactMapper.toDomain(contact) : null;
  }

  async create(contact: Contact): Promise<Contact> {
    const data = KnexContactMapper.toKnex(contact);
    const [createdContact] = await this.db('contacts')
      .insert(data)
      .returning('*');
    return KnexContactMapper.toDomain(createdContact);
  }

  async update(id: string, contact: Partial<Contact>): Promise<Contact | null> {
    const [updatedContact] = await this.db('contacts')
      .update(contact)
      .where({ id })
      .returning('*');
    return updatedContact ? KnexContactMapper.toDomain(updatedContact) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db('contacts').delete().where({ id });
  }
}
