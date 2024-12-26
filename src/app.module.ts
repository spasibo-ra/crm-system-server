import { Module } from '@nestjs/common';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { CrmModule } from './application/crm/crm.module';

@Module({
  imports: [
    PersistenceModule.register({ type: 'knex', global: true }),
    CrmModule,
  ],
})
export class AppModule {}
