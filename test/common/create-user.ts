import { HashService } from '@shared/hash/hash.service';
import { User } from '@app/domain/crm/user';
import { createEntiry } from './db.knex';
import { KnexUserMapper } from '@app/infrastructure/persistence/knex/mapper/knex-user.mapper';

export async function createUser(_user: User) {
  const password = await HashService.hashPassword(_user.password);
  const result = await createEntiry('users', {
    ..._user.currentState,
    password,
  } as User);
  return KnexUserMapper.toDomain(result);
}
