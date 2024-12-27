import { Injectable } from '@nestjs/common';
import { ContactRepository } from '../../ports';

@Injectable()
export class GetContactByIdUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(id: string) {
    return await this.contactRepository.findById(id);
  }
}
