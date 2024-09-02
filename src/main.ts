import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const swaggerEndpoint = 'api';
  const config = new DocumentBuilder()
    /** TODO: Change title. */
    .setTitle('Nest Template')
    /** TODO: Change description. */
    .setDescription('Open API documentation for Nest Template')
    /** TODO: Update version. */
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerEndpoint, app, document, {
    jsonDocumentUrl: `${swaggerEndpoint}/json`,
    swaggerOptions: {
      persistAuthorization: true,
    },
    /** TODO: Update site title. */
    customSiteTitle: 'Nest API Docs',
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/${swaggerEndpoint}`);
}
bootstrap();
