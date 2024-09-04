import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomError } from './custom.error';

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter<CustomError> {
  private readonly logger = new Logger(CustomErrorFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: CustomError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    error.params = {
      ...error.params,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    const responseBody = {
      message: error.message,
      name: error.name,
      errorCode: error.code,
      description: error.description,
      statusCode: error.httpStatus,
      timestamp: new Date().toISOString(),
      params: error.params || {},
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
    httpAdapter.reply(ctx.getResponse(), responseBody, error.httpStatus);
  }
}
