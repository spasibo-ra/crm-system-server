import { Injectable, NotFoundException } from '@nestjs/common';
import { Deal } from '@app/domain/crm/deal';
import { DealRepository } from '../../ports';

interface UpdateDealUseCaseCommand {
  id: string;
  deal: Partial<Omit<Deal, 'id' | 'currentState' | 'createdAt' | 'updatedAt'>>;
}

@Injectable()
export class UpdateDealUseCase {
  constructor(private readonly dealRepository: DealRepository) {}

  async execute({ id, deal }: UpdateDealUseCaseCommand) {
    const existingDeal = await this.dealRepository.findById(id);
    if (!existingDeal)
      throw new NotFoundException(`Deal with ID: ${id} not found`);
    const updatedDeal = await this.dealRepository.update(id, {
      ...existingDeal,
      ...deal,
      updatedAt: new Date(),
    });
    if (!updatedDeal) throw new Error(`Failed to update deal with ID ${id}`);
    return updatedDeal;
  }
}
