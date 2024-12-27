import { RefreshTokenRepository } from '@app/application/crm/ports';
import { RefreshToken } from '@app/domain/crm/refresh-token';
import { Injectable } from '@nestjs/common';
import { InjectDB, Knex } from '@shared/knex';
import { KnexRefreshTokenMapper } from '../mapper';

@Injectable()
export class KnexRefreshTokenRepository implements RefreshTokenRepository {
  constructor(@InjectDB() private readonly db: Knex) {}

  async findByToken(token: string): Promise<RefreshToken | null> {
    const tokenRecord = await this.db('refresh_token').first().where({ token });
    return tokenRecord ? KnexRefreshTokenMapper.toDomain(tokenRecord) : null;
  }

  async create(data: RefreshToken): Promise<boolean> {
    const tokenRecord = KnexRefreshTokenMapper.toKnex(data);
    const [id] = await this.db('refresh_token')
      .insert(tokenRecord)
      .returning('id');
    return id ? true : false;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.db('refresh_token').delete().where({ userId });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.db('refresh_token').delete().where({ token });
  }

  async deleteExpiredToken(expiredAt: Date): Promise<void> {
    await this.db('refresh_token').delete().where('expiredAt', '<', expiredAt);
  }
}
