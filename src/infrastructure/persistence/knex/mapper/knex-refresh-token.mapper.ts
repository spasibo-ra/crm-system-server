import { RefreshToken } from '@app/domain/crm/refresh-token';
import { RefreshTokenTable } from '../types/tables';

export class KnexRefreshTokenMapper {
  static toDomain(raw: RefreshTokenTable): RefreshToken {
    const model = new RefreshToken({
      id: raw.id,
      token: raw.token,
      userId: raw.userId,
      expiresAt: raw.expiresAt,
      createdAt: raw.createdAt,
    });
    return model;
  }

  static toKnex(refreshToken: RefreshToken): RefreshTokenTable {
    return {
      id: refreshToken.id,
      token: refreshToken.token,
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
      createdAt: refreshToken.createdAt,
    };
  }
}
