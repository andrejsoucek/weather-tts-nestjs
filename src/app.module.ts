import { Module } from '@nestjs/common';
import { AtisModule } from './atis/atis.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AtisModule,
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
