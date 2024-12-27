import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { Deal } from '@app/domain/crm/deal';
import { DealRepository } from '../../ports';

interface CreateDealUseCaseCommand {
  user: TokenPayload;
  _deal: Pick<
    Deal,
    'customerId' | 'title' | 'stage' | 'status' | 'amount' | 'currency'
  > &
    Partial<Pick<Deal, 'description' | 'closedAt'>>;
}

@Injectable()
export class CreateDealUseCase {
  constructor(private readonly dealRepository: DealRepository) {}

  async execute({ user, _deal }: CreateDealUseCaseCommand) {
    const deal = new Deal({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ..._deal,
      managerId: user.id,
    });
    return await this.dealRepository.create(deal);
  }
}
