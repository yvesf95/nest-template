import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { BaseRepository } from './common/db';
import { config } from './config';

export default defineConfig({
  entityRepository: BaseRepository,
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
