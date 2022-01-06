import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';

// Models
import { User } from '@app/common/models';

const migrationsDir: string = resolve(__dirname, 'migrations');

const config: ConnectionOptions = {
  cli: {
    migrationsDir,
  },
  database: process.env.DB_NAME,
  entities: [User],
  host: process.env.DB_HOST,
  migrations: [resolve(migrationsDir, '*.js')],
  migrationsRun: true,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  type: 'postgres',
  username: process.env.DB_USER,
};

export default config;
