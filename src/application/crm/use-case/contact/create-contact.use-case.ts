import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ContactRepository } from '../../ports';
import { Contact } from '@app/domain/crm/contact';

interface CreateContactUseCaseCommand {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

@Injectable()
export class CreateContactUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(_contact: CreateContactUseCaseCommand) {
    const contact = new Contact({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._contact,
    });
    return await this.contactRepository.create(contact);
  }
}
