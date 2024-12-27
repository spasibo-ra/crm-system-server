import { Module } from '@nestjs/common';
import { CreateContactUseCase } from './create-contact.use-case';
import { GetAllContactsUseCase } from './get-all-contacts.use-case';
import { GetContactByIdUseCase } from './get-contact-by-id.use-case';
import { DeleteContactUseCase } from './delete-contact.use-case';
import { UpdateContactUseCase } from './update-contact.use-case';

@Module({
  providers: [
    CreateContactUseCase,
    DeleteContactUseCase,
    GetAllContactsUseCase,
    GetContactByIdUseCase,
    UpdateContactUseCase,
  ],
  exports: [
    CreateContactUseCase,
    DeleteContactUseCase,
    GetAllContactsUseCase,
    GetContactByIdUseCase,
    UpdateContactUseCase,
  ],
})
export class ContactUseCaseModule {}
