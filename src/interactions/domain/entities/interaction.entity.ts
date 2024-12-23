import { InteractionType } from './interaction-type.enum';

export class Interaction {
  constructor(
    public id: string,
    public customerId: string,
    public managerId: string,
    public type: InteractionType,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
