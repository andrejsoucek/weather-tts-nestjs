import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('pug');
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
  await app.listen(3000);
}

bootstrap();
