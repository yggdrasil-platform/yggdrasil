import {
  IApplicationsEnvironmentVariables,
  IBaseEnvironmentVariables,
  IMongoEnvironmentVariables,
  IRedisEnvironmentVariables,
} from '@libs/common/interfaces';

interface IEnvironmentVariables
  extends IApplicationsEnvironmentVariables,
    IBaseEnvironmentVariables,
    IMongoEnvironmentVariables,
    IRedisEnvironmentVariables {
  JWT_SECRET_KEY: string;
}

export default IEnvironmentVariables;
