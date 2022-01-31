import { promises } from 'fs';
import { Connection, ConnectOptions, createConnection } from 'mongoose';
import { join, resolve } from 'path';

// Interfaces
import { IMongoConnection } from '@test/interfaces';

// Utils
import { runSeed } from '@test/utils';

const { readdir } = promises;

/**
 * A set of options to customise what happens when connecting the databases.
 * * {boolean} seed [optional] - whether to drop the databases and sed with dummy data, defaults to `false`.
 * @interface
 */
interface ICreateConnectionsOptions {
  seed?: boolean;
}

/**
 * Convenience function that connects to each MongoDB database, through a separate connection, and seeds each database. Before the database is seeded, the database is dropped.
 * @param {string[]} databases - a list of databases to connect to.
 * @param {ICreateConnectionsOptions} options [optional] - a set of options to customise what happens when connecting the databases.
 * @returns {IMongoConnection[]} a list of connections for each of the databases.
 */
export default async function createConnections(
  databases: string[],
  options: ICreateConnectionsOptions = {
    seed: false,
  },
): Promise<IMongoConnection[]> {
  const connections: IMongoConnection[] = [];
  const seedDir = join(process.cwd(), 'test', 'seeds');
  const sharedConnectionOptions: Partial<ConnectOptions> = {
    authSource: 'admin',
    pass: process.env.EXTERNAL_MONGO_PASSWORD || 'password',
    user: process.env.EXTERNAL_MONGO_USER || 'admin',
  };

  for (const database of databases) {
    const connection: Connection = createConnection(
      `mongodb://localhost:${process.env.EXTERNAL_MONGO_PORT || 27018}`,
      {
        ...sharedConnectionOptions,
        appName: `${database}_test`,
        dbName: database,
      },
    );
    let seedFileNames: string[];

    connections.push({
      connection,
      database,
    });

    if (!options.seed) {
      continue;
    }

    seedFileNames = await readdir(resolve(seedDir, database));

    if (!seedFileNames) {
      console.info(
        `NoSeedDirectoryInfo: no seed directory for the "${database}" database`,
      );

      continue;
    }

    await connection.dropDatabase();

    for (const seedFileName of seedFileNames) {
      const seedFilePath: string = resolve(seedDir, database, seedFileName);
      const seed = await import(seedFilePath);

      if (
        !('name' in seed.default) ||
        !('schema' in seed.default) ||
        !('seeds' in seed.default)
      ) {
        console.warn(
          `UnknownSeedFileWarning: unknown seed file at ${seedFilePath}`,
        );

        continue;
      }

      await runSeed(connection, seed.default);
    }
  }

  return connections;
}
