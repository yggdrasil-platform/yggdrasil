import {
  IBaseEnvironmentVariables,
  IDatabaseEnvironmentVariables,
} from '@app/common/interfaces';

type IEnvironmentVariables = IBaseEnvironmentVariables &
  IDatabaseEnvironmentVariables;

export default IEnvironmentVariables;
