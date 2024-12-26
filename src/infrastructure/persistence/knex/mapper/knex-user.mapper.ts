import { User } from '@app/domain/crm/user';

export class KnexUserMapper {
  static toDomain(raw: User): User {
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
  static toKnex(user: User) {
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
