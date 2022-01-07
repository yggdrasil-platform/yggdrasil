import {
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
  IRedisEnvironmentVariables,
} from '@libs/common/interfaces';

interface IEnvironmentVariables
  extends IBaseEnvironmentVariables,
    IDatabaseEnvironmentVariables,
    IRedisEnvironmentVariables {
  JWT_SECRET_KEY: string;
}

export default IEnvironmentVariables;
