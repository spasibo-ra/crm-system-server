import { Entity } from '@app/core/entities/entity';

export type InteractionType =
  | 'call'
  | 'email'
  | 'meeting'
  | 'follow_up'
  | 'presentation';

export interface InteractionProps {
  id?: string;
  customerId: string;
  managerId: string;
  type: InteractionType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Interaction extends Entity<InteractionProps> {
  constructor(props: InteractionProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get managerId(): string {
    return this.props.managerId;
  }

  get type(): InteractionType {
    return this.props.type;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get currentState(): InteractionProps {
    return this.props;
  }
}
