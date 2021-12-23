import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import morgan from 'morgan';

// Interfaces
import { IEnvironmentVariables } from '@app/common/interfaces';

// Modules
import AppModule from './app';

// Utils
import { createLoggerService } from '@app/common/utils';

(async (): Promise<void> => {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService<IEnvironmentVariables, true> =
    app.get(ConfigService);
  const logger: LoggerService = createLoggerService(
    configService.get<string>('APP_NAME'),
    configService.get<string>('LOG_LEVEL')
  );

  app.useLogger(logger);
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => {
          logger.log(message);
        },
      },
    })
  );
  await app.listen(configService.get<number>('PORT'));

  logger.log(`Application is running on: ${await app.getUrl()}`);
})();
