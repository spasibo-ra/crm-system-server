import { Injectable } from '@nestjs/common';
import { ContactRepository } from '../../ports';

@Injectable()
export class DeleteContactUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(id: string) {
    return await this.contactRepository.delete(id);
  }
}
