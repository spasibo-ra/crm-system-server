import { DynamicModule, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { KnexDBModule } from './knex/knex-db.module';

interface DatabaseOptions {
  type: 'knex' | 'prisma';
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static async register({
    global = false,
    type,
  }: DatabaseOptions): Promise<DynamicModule> {
    const DBModule = type === 'knex' ? KnexDBModule : PrismaModule;
    return {
      global,
      module: PersistenceModule,
      imports: [DBModule],
      exports: [DBModule],
    };
  }
}
