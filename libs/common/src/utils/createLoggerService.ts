import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

/**
 * Creates a logger service to be used when initialising a new application.
 * @param {string} name the name of the application
 * @param {string} logLevel [optional] the severity level of the logs: error, warn, info, http, verbose, debug or silly
 * @returns {LoggerService} an instantiated logger service
 */
export default function createLoggerService(
  name: string,
  logLevel?: string
): LoggerService {
  return WinstonModule.createLogger({
    exitOnError: false,
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: logLevel,
        silent: !logLevel,
      }),
    ],
    defaultMeta: {
      application: name,
    },
  });
}
