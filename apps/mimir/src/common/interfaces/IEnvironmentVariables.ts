import {
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
  IRedisEnvironmentVariables,
} from '@app/common/interfaces';

interface IEnvironmentVariables
  extends IBaseEnvironmentVariables,
    IDatabaseEnvironmentVariables,
    IRedisEnvironmentVariables {
  JWT_SECRET_KEY: string;
}

export default IEnvironmentVariables;
