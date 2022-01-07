import 'reflect-metadata';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Interfaces
import { ILogLevel } from '@app/common/interfaces';
import { IEnvironmentVariables } from './common/interfaces';

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
    configService.get<ILogLevel>('LOG_LEVEL'),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('AUTH_SERVICE_HOST'),
      port: configService.get<number>('AUTH_SERVICE_PORT'),
    },
  });
  app.useLogger(logger);

  await app.startAllMicroservices();
})();
