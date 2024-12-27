import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { User } from '@app/domain/crm/user';
import { UserRepository } from '@app/application/crm/ports/user.repository';
import { KnexUserMapper } from '../mapper';

@Injectable()
export class KnexUserRepository implements UserRepository {
  constructor(@InjectDB() private readonly db: Knex) {}

  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.db('users').select().limit(limit).offset(skip),
      this.db('users').count('id'),
    ]);

    const data = users.map((user) => KnexUserMapper.toDomain(user));
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db('users').first<User>().where({ id });
    return user ? KnexUserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db('users').first<User>().where({ email });
    return user ? KnexUserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    const data = KnexUserMapper.toKnex(user);
    const [createdUser] = await this.db('users').insert(data).returning('*');

    return KnexUserMapper.toDomain(createdUser);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const [updatedUser] = await this.db('users')
      .update(user)
      .where({ id })
      .returning('*');
    return updatedUser ? KnexUserMapper.toDomain(updatedUser) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db('users').delete().where({ id });
  }
}
