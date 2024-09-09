import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomErrorFilter } from './common/error';
import { getPinoConfig } from './common/logger';
import { config } from './config';
import mikroOrmConfig from './mikro-orm.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot(
      getPinoConfig({
        level: config.logger.level,
        pretty: config.logger.prettyPrint,
        exclude: [{ method: RequestMethod.ALL, path: `${config.openApi.path}(.*)` }],
      }),
    ),
    UsersModule,
    MikroOrmModule.forRoot({ ...mikroOrmConfig, autoLoadEntities: true }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CustomErrorFilter }],
})
export class AppModule {}
