import { Connection, EntityTarget } from 'typeorm';

export default async function runSeed<T>(
  connection: Connection,
  entityTarget: EntityTarget<T>,
  seeds: T[],
): Promise<void> {
  await connection
    .createQueryBuilder()
    .insert()
    .into<T>(entityTarget)
    .values(seeds)
    .execute();
}
