import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomError } from './custom.error';

@Catch()
export class AllExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus;
    if (error instanceof CustomError) {
      httpStatus = error.status;
    } else if (error instanceof HttpException) {
      httpStatus = error.getStatus();
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      ...error,
      name: error.name,
      message: error.message,
      status: httpStatus,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    this.logger.error({
      /** Needs to be `msg` to log as message string. */
      msg: `${error.name}: ${error.message}`,
      /**
       * Needs to be `err` to log `stack` with proper new line `\n`
       * https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/#logging-errors-with-pino
       */
      err: error,
    });
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
