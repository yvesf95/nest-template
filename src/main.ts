import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const apiPath = env.openApi.path;
  const apiConfig = new DocumentBuilder()
    .setTitle(env.openApi.title)
    .setDescription(env.openApi.description)
    .setVersion(env.app.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup(apiPath, app, document, {
    // jsonDocumentUrl: `${apiPath}/json`,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: env.openApi.title,
  });

  await app.listen(env.app.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/${apiPath}`);
}
bootstrap();
