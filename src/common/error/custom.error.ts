import { HttpStatus } from '@nestjs/common';

export type CustomErrorParams<TErrorCode = string> = {
  /** Code for identifying the error. */
  code: TErrorCode;

  /** Message to display to the logs and to the user. */
  message: string;

  /** Custom name for the error. Default: `<class name>`. */
  name?: string;

  /** Description on what the error is about. */
  description?: string;

  /** Corresponding HTTP status code. Default: `500`. */
  httpStatus?: HttpStatus;

  /** Additional parameters. */
  extra?: Record<string, unknown>;
};

export class CustomError<TErrorCode = string> extends Error {
  /** Code to identify the error. */
  code: TErrorCode;

  /** Description on what the error is about. */
  description?: string;

  /** Corresponding HTTP status code. Default: `500`. */
  httpStatus: HttpStatus;

  /** Additional parameters. */
  params?: Record<string, unknown>;

  constructor(error: CustomErrorParams<TErrorCode>) {
    super(error.message);
    this.name = error.name || this.constructor.name;
    this.code = error.code;
    this.description = error.description;
    this.httpStatus = error.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
    this.params = error.extra;
  }
}
