// Interfaces
import ILogLevel from './ILogLevel';

interface IBaseEnvironmentVariables {
  // General
  APP_NAME: string;
  LOG_LEVEL: ILogLevel;
  NODE_ENV: string;
  PORT: number;
  VERSION: string;

  // Services
  AUTH_SERVICE_HOST: string;
  AUTH_SERVICE_PORT: number;
  USER_SERVICE_HOST: string;
  USER_SERVICE_PORT: number;
}

export default IBaseEnvironmentVariables;
