import { User } from '@app/domain/crm/user';
import { UserTable } from '../types/tables';
export class KnexUserMapper {
  static toDomain(raw: UserTable): User {
    const model = new User({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      role: raw.role,
      status: raw.status,
      avatarUrl: raw.avatarUrl,
      lastLoginAt: raw.lastLoginAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
    return model;
  }
  static toKnex(user: User): UserTable {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      status: user.status,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
