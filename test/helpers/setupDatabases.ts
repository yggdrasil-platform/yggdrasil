import { promises } from 'fs';
import { join, resolve } from 'path';
import { Connection, createConnections } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Configs
import mimirOrmConfig from '@apps/mimir/ormconfig';
import valhallaOrmConfig from '@apps/valhalla/ormconfig';

// Helpers
import { runSeed } from '@test/helpers';

const { readdir } = promises;

/**
 * Creates connections to each of the services databases and drops the schema and seeds each database with fresh
 * data.
 * @returns {Connection[]} a connection for each service.
 */
export default async function setupDatabases(): Promise<Connection[]> {
  const sharedConnectionOptions: Partial<PostgresConnectionOptions> = {
    dropSchema: true,
    host: 'localhost',
    password: process.env.EXTERNAL_DB_PASSWORD || 'password',
    port: parseInt(process.env.EXTERNAL_DB_PORT || '5433'),
    synchronize: true,
    username: process.env.EXTERNAL_DB_USER || 'admin',
  };
  const connections: Connection[] = await createConnections([
    {
      ...mimirOrmConfig,
      ...sharedConnectionOptions,
      database: 'mimir',
      name: 'mimir',
    },
    {
      ...valhallaOrmConfig,
      ...sharedConnectionOptions,
      database: 'valhalla',
      name: 'valhalla',
    },
  ]);
  const seedDir = join(process.cwd(), 'test', 'seeds');

  // get the seed files for each of databases and insert them
  await Promise.all(
    connections.map(async (connection) => {
      const seedFileNames: string[] = (
        await readdir(resolve(seedDir, connection.name))
      ).filter((value) => value.includes('.seed.ts'));

      for (const seedFileName of seedFileNames) {
        const seed = await import(
          resolve(seedDir, connection.name, seedFileName)
        );

        await runSeed(
          connection,
          seed.default.entityTarget,
          seed.default.seeds,
        );
      }
    }),
  );

  return connections;
}
