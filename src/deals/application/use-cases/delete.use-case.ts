import { Inject, Injectable } from '@nestjs/common';
import { DEALS_REPOSITORY } from '@shared/constants';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';

@Injectable()
export class DeleteDealUseCase {
  constructor(
    @Inject(DEALS_REPOSITORY)
    private readonly dealRepository: IDealRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.dealRepository.delete(id);
  }
}
