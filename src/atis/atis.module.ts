import { Module } from '@nestjs/common';
import { AtisHttpModule } from './ui/http/atis-http.module';
import { AtisStdinModule } from './ui/stdin/atis-stdin.module';
import { AtisGpioModule } from './ui/gpio/atis-gpio.module';

@Module({
  imports: [AtisHttpModule, process.argv.includes('manual') ? AtisStdinModule : AtisGpioModule],
})
export class AtisModule {}
