import { Entity } from '@app/core/entities/entity';

export interface ContactProps {
  id?: string;
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Contact extends Entity<ContactProps> {
  constructor(props: ContactProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get email(): string {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.email;
  }

  get lastName(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): ContactProps {
    return this.props;
  }
}
