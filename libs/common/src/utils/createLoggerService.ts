import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

// Interfaces
import { ILogLevel } from '../interfaces';

/**
 * Creates a logger service to be used when initialising a new application.
 * @param {string} name the name of the application
 * @param {ILogLevel} logLevel [optional] the severity level of the logs: debug, error, info, silent or warn. Defaults
 * to error.
 * @returns {LoggerService} an instantiated logger service
 */
export default function createLoggerService(
  name: string,
  logLevel: ILogLevel = 'error',
): LoggerService {
  return WinstonModule.createLogger({
    exitOnError: false,
    transports: [
      new transports.Console({
        handleExceptions: true,
        ...(logLevel === 'silent'
          ? {
              silent: true,
            }
          : {
              level: logLevel,
            }),
      }),
    ],
    defaultMeta: {
      application: name,
    },
  });
}
