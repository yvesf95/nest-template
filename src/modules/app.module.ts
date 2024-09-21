import { CustomErrorFilter } from '@/common/error';
import { config } from '@/config';
import { getPinoConfig } from '@/lib/pino';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot(
      getPinoConfig({
        level: config.logger.level,
        pretty: config.logger.prettyPrint,
        exclude: [`${config.openApi.path}(.*)`],
      }),
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CustomErrorFilter }],
})
export class AppModule {}
