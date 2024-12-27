import { Contact } from '@app/domain/crm/contact';
import { ContactTable } from '../types/tables';
export class KnexContactMapper {
  static toDomain(raw: ContactTable): Contact {
    const model = new Contact({
      id: raw.id,
      companyId: raw.companyId,
      email: raw.email,
      firstName: raw.firstName,
      lastName: raw.lastName,
      phone: raw.phone,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return model;
  }

  static toKnex(contact: Contact): ContactTable {
    return {
      id: contact.id,
      companyId: contact.companyId,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      createdAt: contact.createdAt,
      updatedAt: contact.createdAt,
    };
  }
}
