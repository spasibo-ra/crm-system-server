import * as crypto from 'crypto';
import { RegisterDto } from '@auth/application/dto/register.dto';
import { HashService } from '@shared/hash/hash.service';
import { User } from '@users/domain/entities/user.entity';
import { Knex } from 'knex';

export async function createUser(db: Knex, registerDto: RegisterDto) {
  const { email, name } = registerDto;
  const password = await HashService.hashPassword(registerDto.password);
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
