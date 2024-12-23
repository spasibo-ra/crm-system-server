import { CreateCustomerDto } from '@customers/application/dto/create.customer.dto';
import { CreateUserDto } from '@users/application/dto/user.dto';

export const user: CreateUserDto = {
  email: 'test@spasibo.ra',
  name: 'testuser',
  password: 'testuser123',
};
export const customer: CreateCustomerDto = {
  email: 'test-customer@crm-system.ra',
  name: 'test-customer',
  phone: '+380507778899',
};
