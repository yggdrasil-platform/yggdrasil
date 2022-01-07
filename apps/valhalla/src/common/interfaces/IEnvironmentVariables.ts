import {
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
} from '@libs/common/interfaces';

type IEnvironmentVariables = IBaseEnvironmentVariables &
  IDatabaseEnvironmentVariables;

export default IEnvironmentVariables;
