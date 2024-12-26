import { Injectable } from '@nestjs/common';
import { DealRepository } from '../../ports';

Injectable();
export class GetAllDealsUseCase {
  constructor(private readonly dealRepository: DealRepository) {}

  async execute(limit: number, page: number) {
    return await this.dealRepository.findAll(limit, page);
  }
}
