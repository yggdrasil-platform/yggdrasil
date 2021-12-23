import { LoggerService } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import morgan from 'morgan';

// Modules
import AppModule from './app';

// Utils
import { createLoggerService } from '@app/common';

(async (): Promise<void> => {
  const logger: LoggerService = createLoggerService(
    process.env.APP_NAME || 'valhalla',
    process.env.LOG_LEVEL
  );
  const app: NestApplication = await NestFactory.create(AppModule, {
    logger,
  });

  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => {
          logger.log(message);
        },
      },
    })
  );
  await app.listen(parseInt(process.env.PORT || '3001', 10));

  logger.log(`Application is running on: ${await app.getUrl()}`);
})();
