import { Entity } from '@app/core/entities/entity';

export type UserRole = 'admin' | 'user' | 'manager';

export type UserStatus = 'active' | 'inactive';

export interface UserProps {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  status?: UserStatus;
  lastLoginAt?: Date;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    props.status = props.status || 'active';
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get lastLoginAt(): Date | undefined {
    return this.props.lastLoginAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): UserProps {
    return this.props;
  }
}
