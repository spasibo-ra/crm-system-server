import { randomUUID } from 'node:crypto';
import { User } from '@app/domain/crm/user';
import { Customer } from '@app/domain/crm/customer';
import { Interaction } from '@app/domain/crm/interaction';

export const user: User = new User({
  id: randomUUID(),
  email: 'test@spasibo.ra',
  name: 'testuser',
  password: 'testuser123',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const customer: Customer = new Customer({
  id: randomUUID(),
  email: 'test-customer@crm-system.ra',
  name: 'test-customer',
  phone: '+380507778899',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const interaction: Interaction = new Interaction({
  id: randomUUID(),
  managerId: user.id,
  customerId: customer.id,
  type: 'email',
  description: 'Test interaction',
  createdAt: new Date(),
  updatedAt: new Date(),
});
