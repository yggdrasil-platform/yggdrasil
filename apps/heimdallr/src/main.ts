import { LoggerService } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

// Modules
import AppModule from './app';

(async (): Promise<void> => {
  const logger: LoggerService = WinstonModule.createLogger({
    exitOnError: false,
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: process.env.LOG_LEVEL,
        silent: !process.env.LOG_LEVEL,
      }),
    ],
    ...(process.env.SERVICE_NAME && {
      defaultMeta: {
        service: process.env.SERVICE_NAME,
      },
    }),
  });
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
  await app.listen(parseInt(process.env.PORT || '3000', 10));

  logger.log(`Application is running on: ${await app.getUrl()}`);
})();
