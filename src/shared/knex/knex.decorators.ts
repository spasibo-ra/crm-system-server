import { Inject } from '@nestjs/common';
import { getKnexConnectionToken } from './knex.utils';

export const InjectDB = (connection?: string) => {
  return Inject(getKnexConnectionToken(connection));
};

export const InjectConnection = InjectDB;
