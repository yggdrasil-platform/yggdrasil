// Interfaces
import ILogLevel from './ILogLevel';

interface IBaseEnvironmentVariables {
  // General
  APP_NAME: string;
  LOG_LEVEL: ILogLevel;
  NODE_ENV: string;
  PORT: number;
  VERSION: string;
}

export default IBaseEnvironmentVariables;
