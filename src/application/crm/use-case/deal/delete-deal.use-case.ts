import { Injectable } from '@nestjs/common';
import { DealRepository } from '../../ports';

@Injectable()
export class DeleteDealUseCase {
  constructor(private readonly dealRepository: DealRepository) {}

  async execute(id: string) {
    return await this.dealRepository.delete(id);
  }
}
