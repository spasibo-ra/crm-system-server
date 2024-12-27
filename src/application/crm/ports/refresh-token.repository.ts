import { RefreshToken } from '@app/domain/crm/refresh-token';

export abstract class RefreshTokenRepository {
  abstract findByToken(token: string): Promise<RefreshToken | null>;
  abstract create(data: RefreshToken): Promise<boolean>;
  abstract deleteByUserId(userId: string): Promise<void>;
  abstract deleteByToken(token: string): Promise<void>;
  abstract deleteExpiredToken(expiredAt: Date): Promise<void>;
}
