import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import * as shortUUID from 'short-uuid';
import { AppModule } from './app.module';
import { config } from './config';
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

  const apiPath = config.openApi.path;
  const apiConfig = new DocumentBuilder()
    .setTitle(config.openApi.title)
    .setDescription(config.openApi.description)
    .setVersion(config.app.version)
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
    customSiteTitle: config.openApi.title,
    urls: [{ name: 'json', url: `${apiPath}/json` }],
    swaggerUiEnabled: config.openApi.enabled,
  });

  await app.listen(config.app.port);
  logger.log(`Application is running on: ${await app.getUrl()}`, 'Main');

  if (config.openApi.enabled) {
    logger.log(`Swagger is running on: ${await app.getUrl()}/${apiPath}`, 'Main');
  }
}
bootstrap();
