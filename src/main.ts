import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';

const validateEnvVariables = () => {
  const inputMode = process.env.INPUT_MODE;
  const outputMode = process.env.OUTPUT_MODE;

  switch (inputMode) {
    case 'manual':
    case 'wakeword':
    case 'gpio':
      console.log(`Input mode: ${inputMode}`);
      break;
    default:
      throw new Error(
        `Invalid input mode: ${inputMode}. Set INPUT_MODE env variable to one of the following: manual, wakeword, gpio`,
      );
  }

  switch (outputMode) {
    case 'direct':
    case 'gpio':
      console.log(`Output mode: ${outputMode}`);
      break;
    default:
      throw new Error(
        `Invalid output mode: ${outputMode}. Set OUTPUT_MODE env variable to one of the following: direct, gpio`,
      );
  }
};

const createDb = () => {
  const dbFile = join(process.cwd(), 'db.sqlite');
  if (fs.existsSync(dbFile)) {
    console.log('Database already exists. Skipping creation.');
    return;
  }

  const db = new sqlite3.Database('db.sqlite');
  const structure = fs.readFileSync(path.join(process.cwd(), 'create-db.sql'), 'utf8');
  db.exec(structure);
  db.close();
};

async function bootstrap() {
  validateEnvVariables();
  createDb();
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

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
