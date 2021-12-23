// Enums
import { IEnvironmentVariables } from '@app/common/interfaces';

interface IUserServiceEnvironmentVariables extends IEnvironmentVariables {
  USER_SERVICE_DB_HOST: string;
  USER_SERVICE_DB_NAME: string;
  USER_SERVICE_DB_PASSWORD: string;
  USER_SERVICE_DB_PORT: number;
  USER_SERVICE_DB_USER: string;
}

export default IUserServiceEnvironmentVariables;
