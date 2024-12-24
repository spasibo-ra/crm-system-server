import * as crypto from 'node:crypto';
import { User } from '@users/domain/entities/user.entity';
import { Customer } from '@customers/domain/entities/customer.entity';
import { InteractionType } from '@interactions/domain/entities';
import { CreateInteractionDto } from '@interactions/application/dto';

export const user: User = {
  id: crypto.randomUUID(),
  email: 'test@spasibo.ra',
  name: 'testuser',
  password: 'testuser123',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const customer: Customer = {
  id: crypto.randomUUID(),
  email: 'test-customer@crm-system.ra',
  name: 'test-customer',
  phone: '+380507778899',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const interaction: CreateInteractionDto = {
  customerId: customer.id,
  type: InteractionType.EMAIL,
  description: 'Test interaction',
};
