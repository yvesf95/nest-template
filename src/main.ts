import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as shortUUID from 'short-uuid';
import { AppModule } from './app.module';
import { env } from './env';
import metadata from './metadata';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    /** This is to provide a unique request ID on every request. */
    genReqId: () => shortUUID.generate(),
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  /** Uncomment this to set a global prefix. (e.g. 'api', 'v1', or 'api/v1') */
  // app.setGlobalPrefix('v1');

  const logger = app.get(Logger);
  app.useLogger(logger);

  const apiPath = env.openApi.path;
  const apiConfig = new DocumentBuilder()
    .setTitle(env.openApi.title)
    .setDescription(env.openApi.description)
    .setVersion(env.app.version)
    .addBearerAuth()
    .build();

  /**
   * When using SWC to build,
   * we need to load the plugin metadata so that swagger cli plugin can read it.
   * This metadata file is auto-generated upon start.
   */
  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup(apiPath, app, document, {
    jsonDocumentUrl: `${apiPath}/json`,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: env.openApi.title,
    urls: [{ name: 'json', url: `${apiPath}/json` }],
    swaggerUiEnabled: env.openApi.enabled,
  });

  await app.listen(env.app.port);
  logger.log(`Application is running on: ${await app.getUrl()}`, 'Main');

  if (env.openApi.enabled) {
    logger.log(`Swagger is running on: ${await app.getUrl()}/${apiPath}`, 'Main');
  }
}
bootstrap();
