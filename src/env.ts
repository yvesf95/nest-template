import { z } from 'zod';

const envSchema = z.object({
  /** This comes from package.json */
  npm_package_version: z.string().default('0.0.1'),
  APP_PORT: z.coerce.number().min(1000),
  OPEN_API_TITLE: z.string().default('Example API'),
  OPEN_API_DESCRIPTION: z.string().default('This is an example API'),
  OPEN_API_PATH: z.string().default('api'),
  LOG_LEVEL: z.union([z.literal('info'), z.literal('debug'), z.literal('error')]).default('info'),
  LOG_PRETTY_PRINT: z.coerce.boolean().optional(),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.error('❌ Invalid environment variables:', error.format());
  process.exit(1);
}

export const env = {
  app: {
    version: data.npm_package_version,
    port: data.APP_PORT,
  },
  openApi: {
    title: data.OPEN_API_TITLE,
    description: data.OPEN_API_DESCRIPTION,
    path: data.OPEN_API_PATH,
  },
  logger: {
    level: data.LOG_LEVEL,
    prettyPrint: data.LOG_PRETTY_PRINT,
  },
};
