interface IEnvironmentVariables {
  // General
  APP_NAME: string;
  LOG_LEVEL?: string;
  NODE_ENV: string;
  PORT: number;
  VERSION: string;

  // User service
  USER_SERVICE_HOST: string;
  USER_SERVICE_PORT: number;
}

export default IEnvironmentVariables;
