import { Entity } from '@app/core/entities/entity';

export interface RefreshTokenProps {
  id?: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export class RefreshToken extends Entity<RefreshTokenProps> {
  constructor(props: RefreshTokenProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get token(): string {
    return this.props.token;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get currentState(): RefreshTokenProps {
    return this.props;
  }
}
