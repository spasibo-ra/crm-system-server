import { Module } from '@nestjs/common';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { CrmModule } from './application/crm/crm.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PersistenceModule.register({ type: 'knex', global: true }),
    CrmModule,
    LoggerModule,
  ],
})
export class AppModule {}
