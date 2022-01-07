import { EntityTarget } from 'typeorm';

interface ISeed<T> {
  entityTarget: EntityTarget<T>;
  seeds: T[];
}

export default ISeed;
