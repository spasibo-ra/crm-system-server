import { Injectable } from '@nestjs/common';
import { ContactRepository } from '../../ports';

@Injectable()
export class GetAllContactsUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(limit: number, page: number) {
    return await this.contactRepository.findAll(limit, page);
  }
}
