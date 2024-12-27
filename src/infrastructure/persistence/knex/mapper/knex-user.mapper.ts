import { User } from '@app/domain/crm/user';
import { UserTable } from '../types/tables';
export class KnexUserMapper {
  static toDomain(raw: UserTable): User {
    const model = new User({
      id: raw.id,
      createdAt: raw.createdAt,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      updatedAt: raw.updatedAt,
    });
    return model;
  }
  static toKnex(user: User): UserTable {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
