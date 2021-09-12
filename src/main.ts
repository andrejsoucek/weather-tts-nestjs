import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setViewEngine('pug');
  app.setBaseViewsDir('src/atis/ui/http/views');
  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'bulma', 'css'), {
    prefix: '/bulma',
  });
  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'chart.js', 'dist'), {
    prefix: '/chartjs',
  });
  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'chartjs-plugin-datalabels', 'dist'), {
    prefix: '/chartjs-datalabels',
  });
  app.useStaticAssets(join(__dirname, '..', 'node_modules', '@fortawesome', 'fontawesome-free', 'js'), {
    prefix: '/fa',
  });

  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
