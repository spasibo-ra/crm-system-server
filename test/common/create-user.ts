import * as crypto from 'crypto';
import { HashService } from '@shared/hash/hash.service';
import { User } from '@users/domain/entities/user.entity';
import { Knex } from 'knex';
import { CreateUserDto } from '@users/application/dto/user.dto';

export async function createUser(db: Knex, _user: CreateUserDto) {
  const { email, name } = _user;
  const password = await HashService.hashPassword(_user.password);
  const data: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const [user] = await db('users').insert(data).returning<User[]>('*');
  return user;
}
