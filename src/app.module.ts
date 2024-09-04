import { Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getPinoConfig } from './common/logger/pino.config';
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
  providers: [AppService],
})
export class AppModule {}
