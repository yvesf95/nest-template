import { z } from 'zod';

const envSchema = z.object({
  /** App */
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  APP_PORT: z.coerce.number().min(1000).default(3000),
  /** This comes from package.json */
  npm_package_version: z.string(),

  /** Logger */
  LOG_LEVEL: z.union([z.literal('info'), z.literal('debug'), z.literal('error')]).default('info'),
  LOG_PRETTY_PRINT: z.coerce.boolean().optional(),

  /** Database */
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().min(1000),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_DEBUG: z.coerce.boolean().default(false),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.error('❌ Invalid environment variables:', error.format());
  process.exit(1);
}

export const config = {
  app: {
    version: data.npm_package_version,
    port: data.APP_PORT,
    mode: data.NODE_ENV,
  },
  openApi: {
    enabled: data.NODE_ENV === 'development',
    title: 'Example API',
    description: 'This is an example of a REST API',
    path: 'api',
  },
  logger: {
    level: data.LOG_LEVEL,
    prettyPrint: data.LOG_PRETTY_PRINT,
  },
  db: {
    host: data.DB_HOST,
    port: data.DB_PORT,
    user: data.DB_USER,
    password: data.DB_PASSWORD,
    name: data.DB_NAME,
    debug: data.DB_DEBUG,
  },
};
