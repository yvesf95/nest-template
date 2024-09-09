import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { BaseRepository } from './common/db';
import { config } from './config';

const kebabize = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

export default defineConfig({
  entities: ['./dist/**/*.entity.js'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/**/*.entity.ts'], // path to your TS entities (source), relative to `baseDir`
  entityRepository: BaseRepository,
  extensions: [SeedManager],
  seeder: {
    path: './src/seeders', // path to the folder with seeders
    defaultSeeder: 'DatabaseSeeder',
    fileName: (className: string) => kebabize(className).replace('-seeder', '.seeder'),
  },
  /** Set this to the database driver you want to use. */
  driver: PostgreSqlDriver,

  /** Name of the database */
  dbName: config.db.name,
  /** Host of the database */
  host: config.db.host,
  /** Port of the database */
  port: config.db.port,
  /** Username of the database */
  user: config.db.user,
  /** Password of the database */
  password: config.db.password,
  /** Debug mode of the database */
  debug: config.db.debug,
});
