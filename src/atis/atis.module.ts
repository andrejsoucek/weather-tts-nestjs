import { Module } from '@nestjs/common';
import { AtisHttpModule } from './ui/http/atis-http.module';

@Module({
  imports: [AtisHttpModule],
})
export class AtisModule {}
