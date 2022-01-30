import {
  IApplicationsEnvironmentVariables,
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
} from '@libs/common/interfaces';

type IEnvironmentVariables = IApplicationsEnvironmentVariables &
  IBaseEnvironmentVariables &
  IDatabaseEnvironmentVariables;

export default IEnvironmentVariables;
