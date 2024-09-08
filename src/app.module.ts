import { Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomErrorFilter } from './common/error';
import { getPinoConfig } from './common/logger';
import { env } from './env';

@Module({
  imports: [
    LoggerModule.forRoot(
      getPinoConfig({
        level: env.logger.level,
        pretty: env.logger.prettyPrint,
        exclude: [{ method: RequestMethod.ALL, path: `${env.openApi.path}(.*)` }],
      }),
    ),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CustomErrorFilter }],
})
export class AppModule {}
