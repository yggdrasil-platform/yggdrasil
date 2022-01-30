import {
  IApplicationsEnvironmentVariables,
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
  IRedisEnvironmentVariables,
} from '@libs/common/interfaces';

interface IEnvironmentVariables
  extends IApplicationsEnvironmentVariables,
    IBaseEnvironmentVariables,
    IDatabaseEnvironmentVariables,
    IRedisEnvironmentVariables {
  JWT_SECRET_KEY: string;
}

export default IEnvironmentVariables;
