import { Entity } from '@app/core/entities/entity';

export interface CompanyProps {
  id?: string;
  name: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Company extends Entity<CompanyProps> {
  constructor(props: CompanyProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get industry(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): CompanyProps {
    return this.props;
  }
}
