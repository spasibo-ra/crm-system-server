import { Inject, Injectable } from '@nestjs/common';
import { DEALS_REPOSITORY } from '@shared/constants';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';

Injectable();
export class GetAllDealsUseCase {
  constructor(
    @Inject(DEALS_REPOSITORY)
    private readonly dealRepository: IDealRepository,
  ) {}

  async execute(limit: number, page: number) {
    return await this.dealRepository.findAll(limit, page);
  }
}
