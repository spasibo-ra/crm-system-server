import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DEALS_REPOSITORY } from '@shared/constants';
import { IDealRepository } from '@deals/domain/repositories/deal.repository';
import { Deal } from '@deals/domain/entities';
import { UpdateDealDto } from '../dto';

@Injectable()
export class UpdateDealUseCase {
  constructor(
    @Inject(DEALS_REPOSITORY)
    private readonly dealRepository: IDealRepository,
  ) {}

  async execute(id: string, updateDto: UpdateDealDto): Promise<Deal> {
    const existingDeal = await this.dealRepository.findById(id);
    if (!existingDeal)
      throw new NotFoundException(`Deal with ID: ${id} not found`);
    const updatedDeal = await this.dealRepository.update(id, {
      ...existingDeal,
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!updatedDeal) throw new Error(`Failed to update deal with ID ${id}`);
    return updatedDeal;
  }
}
