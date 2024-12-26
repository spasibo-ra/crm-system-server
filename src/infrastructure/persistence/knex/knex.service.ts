import { EnvService } from '@app/infrastructure/env';
import { Injectable, Inject } from '@nestjs/common';
import { KnexModuleOptions, KnexModuleOptionsFactory } from '@shared/knex';

@Injectable()
export class KnexService implements KnexModuleOptionsFactory {
  constructor(@Inject() private readonly envService: EnvService) {}

  createKnexModuleOptions(): KnexModuleOptions {
    return {
      config: {
        client: 'pg',
        connection: {
          host: this.envService.get('PGHOST'),
          port: this.envService.get('PGPORT'),
          user: this.envService.get('PGUSER'),
          password: this.envService.get('PGPASSWORD'),
          database: this.envService.get('PGDATABASE'),
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
