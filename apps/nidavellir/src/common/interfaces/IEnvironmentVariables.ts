import {
  IApplicationsEnvironmentVariables,
  IBaseEnvironmentVariables,
  IMongoEnvironmentVariables,
} from '@libs/common/interfaces';

type IEnvironmentVariables = IApplicationsEnvironmentVariables &
  IBaseEnvironmentVariables &
  IMongoEnvironmentVariables;

export default IEnvironmentVariables;
