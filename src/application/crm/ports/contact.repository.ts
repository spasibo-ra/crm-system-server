import { Contact } from '@app/domain/crm/contact';

export abstract class ContactRepository {
  abstract findAll(
    limit: number,
    page: number,
  ): Promise<{ data: Contact[]; total: number }>;
  abstract findById(id: string): Promise<Contact | null>;
  abstract findByEmail(email: string): Promise<Contact | null>;
  abstract create(contact: Contact): Promise<Contact>;
  abstract update(
    id: string,
    contact: Partial<Contact>,
  ): Promise<Contact | null>;
  abstract delete(id: string): Promise<void>;
}
