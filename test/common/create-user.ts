import { HashService } from '@shared/hash/hash.service';
import { User } from '@users/domain/entities/user.entity';
import { createEntiry } from './db.knex';

export async function createUser(_user: User) {
  const password = await HashService.hashPassword(_user.password);
  const data: User = {
    ..._user,
    password,
  };
  return await createEntiry('users', data);
}
