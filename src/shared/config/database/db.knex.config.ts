import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnexModuleOptions, KnexModuleOptionsFactory } from '@shared/knex';

@Injectable()
export class KnexDatabaseService implements KnexModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createKnexModuleOptions(): KnexModuleOptions {
    return {
      config: {
        client: 'pg',
        connection: {
          host: this.config.get<string>('PGHOST'),
          port: this.config.get<number>('PGPORT'),
          user: this.config.get<string>('PGUSER'),
          password: this.config.get<string>('PGPASSWORD'),
          database: this.config.get<string>('PGDATABASE'),
        },
        pool: {
          min: 2,
          max: 10,
        },
        acquireConnectionTimeout: 25000,
      },
    };
  }
}
