import { HttpModule } from '@app/infrastructure/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class CrmModule {}
