import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CreateDealDto } from '../dto';
import { DEALS_REPOSITORY } from '@shared/constants';
import { TokenPayload } from '@auth/domain/entities/token-payload.interface';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';
import { Deal } from '@deals/domain/entities';

@Injectable()
export class CreateDealUseCase {
  constructor(
    @Inject(DEALS_REPOSITORY)
    private readonly dealRepository: IDealRepository,
  ) {}

  async execute(user: TokenPayload, createDto: CreateDealDto) {
    const deal = new Deal(
      crypto.randomUUID(),
      createDto.customerId,
      user.id,
      createDto.title,
      createDto.description,
      createDto.status,
      createDto.stage,
      createDto.amount,
      createDto.currency,
      createDto.closedAt,
      new Date(),
      new Date(),
    );
    return this.dealRepository.create(deal);
  }
}
