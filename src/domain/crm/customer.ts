import { Entity } from '@app/core/entities/entity';

export interface CustomerProps {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Customer extends Entity<CustomerProps> {
  constructor(props: CustomerProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): CustomerProps {
    return this.props;
  }
}
