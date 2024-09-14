import { Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomErrorFilter } from './common/error';
import { getPinoConfig } from './common/logger';
import { config } from './config';
import { FirebaseAuthService } from './lib/firebase/firebase-auth.service';
import { FirebaseModule } from './lib/firebase/firebase.module';
import { AuthModule } from './modules/auth/auth.module';
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
    AuthModule.forRoot({
      authModule: [FirebaseModule.forRoot({ serviceAccount: config.firebase })],
      jwt: { authService: FirebaseAuthService },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CustomErrorFilter }],
})
export class AppModule {}
