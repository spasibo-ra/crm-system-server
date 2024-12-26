import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { User } from '@app/domain/crm/user';
import { UserRepository } from '@app/application/crm/ports/user.repository';
import { KnexUserMapper } from '../mapper/knex-user.mapper';

@Injectable()
export class KnexUserRepository implements UserRepository {
  private readonly userTable: string = 'users';
  constructor(@InjectDB() private readonly db: Knex) {}

  async findAll(
    limit: number,
    page: number,
  ): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.db(this.userTable).select<User[]>().limit(limit).offset(skip),
      this.db(this.userTable).count('id'),
    ]);

    const data = users.map((user) => KnexUserMapper.toDomain(user));
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db(this.userTable).first<User>().where({ id });
    return user ? KnexUserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db(this.userTable).first<User>().where({ email });
    return user ? KnexUserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const [createdUser] = await this.db(this.userTable)
      .insert(data)
      .returning<User[]>('*');

    return KnexUserMapper.toDomain(createdUser);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const [updatedUser] = await this.db(this.userTable)
      .update(user)
      .where({ id })
      .returning<User[]>('*');
    return updatedUser ? KnexUserMapper.toDomain(updatedUser) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.userTable).delete().where({ id });
  }
}
