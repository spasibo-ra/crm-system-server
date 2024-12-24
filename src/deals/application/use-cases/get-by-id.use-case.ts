import { Inject, Injectable } from '@nestjs/common';
import { DEALS_REPOSITORY } from '@shared/constants';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';
import { Deal } from '@deals/domain/entities';

@Injectable()
export class GetDealByIdUseCase {
  constructor(
    @Inject(DEALS_REPOSITORY)
    private readonly dealRepository: IDealRepository,
  ) {}

  async execute(id: string): Promise<Deal> {
    return await this.dealRepository.findById(id);
  }
}
