import { Module } from '@nestjs/common';
import { AtisHttpModule } from './ui/http/atis-http.module';
import { AtisStdinModule } from './ui/stdin/atis-stdin.module';
import { AtisGpioModule } from './ui/gpio/atis-gpio.module';
import { AtisAudioModule } from './ui/audio/atis-audio.module';

const getInputModule = () => {
  switch (process.env.INPUT_MODE) {
    case 'manual':
      return AtisStdinModule;
    case 'wakeword':
      return AtisAudioModule;
    default:
      return AtisGpioModule;
  }
};
@Module({
  imports: [AtisHttpModule, getInputModule()],
})
export class AtisModule {}
