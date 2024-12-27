import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from '@app/domain/crm/contact';
import { ContactRepository } from '../../ports';

interface UpdateContactUseCaseCommand {
  id: string;
  contact: Partial<
    Pick<Contact, 'companyId' | 'firstName' | 'lastName' | 'email' | 'phone'>
  >;
}

@Injectable()
export class UpdateContactUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute({
    id,
    contact,
  }: UpdateContactUseCaseCommand): Promise<Contact> {
    const existingCompany = await this.contactRepository.findById(id);
    if (!existingCompany)
      throw new NotFoundException(`Contact with ID: ${id} not found`);
    const updatedContact = await this.contactRepository.update(id, {
      ...contact,
      updatedAt: new Date(),
    });
    if (!updatedContact)
      throw new Error(`Failed to update contact with ID ${id}`);
    return updatedContact;
  }
}
