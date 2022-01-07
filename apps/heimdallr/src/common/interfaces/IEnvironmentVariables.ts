import {
  IApplicationsEnvironmentVariables,
  IBaseEnvironmentVariables,
} from '@libs/common/interfaces';

type IEnvironmentVariables = IApplicationsEnvironmentVariables &
  IBaseEnvironmentVariables;

export default IEnvironmentVariables;
