import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { User } from '@users/domain/entities/user.entity';

@Injectable()
export class KnexUserRepository implements IUserRepository {
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

    const data = users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        ),
    );
    return { data, total: +total[0].count };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db(this.userTable).first<User>().where({ id });
    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        )
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db(this.userTable).first<User>().where({ email });
    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        )
      : null;
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

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const [updatedUser] = await this.db(this.userTable)
      .update(user)
      .where({ id })
      .returning<User[]>('*');
    return updatedUser
      ? new User(
          updatedUser.id,
          updatedUser.name,
          updatedUser.email,
          updatedUser.password,
          updatedUser.createdAt,
          updatedUser.updatedAt,
        )
      : null;
  }

  async delete(id: string): Promise<void> {
    await this.db(this.userTable).delete().where({ id });
  }
}
