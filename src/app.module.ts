import { Module } from '@nestjs/common';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { CrmModule } from './application/crm/crm.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PersistenceModule.register({ type: 'knex', global: true }),
    CrmModule,
  ],
})
export class AppModule {}
