import { RouteInfo } from '@nestjs/common/interfaces';
import { Params } from 'nestjs-pino';

export type LogLevel = 'debug' | 'info' | 'error';

export type GetPinoConfigParam = {
  /**
   * Log level to print. Default: `info`.
   * - `debug` - print all logs.
   * - `info` - print info, warn, and error logs only.
   * - `error` - print error logs only.
   */
  level?: LogLevel;
  /** When `true`, the logs will be pretty printed, otherwise logs will be printed in json format. Default: `false`. */
  pretty?: boolean;
  /** API routes to exclude from performing request/response logging. */
  exclude?: (string | RouteInfo)[];
};

/** Factory function to create pino logger params. */
export const getPinoConfig = (params: GetPinoConfigParam) => {
  const pinoHttpConfig: Params['pinoHttp'] = {
    timestamp: true,
    level: params.level || 'info',
    /** Set to `undefined` to avoid adding pid, hostname properties to each log. */
    base: undefined,
    hooks: { logMethod },
    customReceivedMessage: (req: any) => `${req.method} '${req.url}' received`,
    customSuccessMessage: (req, res, responseTime) =>
      `${req.method} '${req.url}' completed - ${res.statusCode} ${res.statusMessage} - ${responseTime}ms`,
    customErrorMessage: (req, res) =>
      `${req.method} '${req.url}' failed with status code ${res.statusCode} ${res.statusMessage}`,
    quietReqLogger: true,
    quietResLogger: true,
  };

  if (params.pretty) {
    pinoHttpConfig.transport = {
      /**
       * Uses our custom `pino-pretty-transport` module to print logs in a pretty format.
       * Note: The reason why pino-pretty is a custom module is because not all options are serializable,
       * In this case, we are using `messageFormat` as a function, so we need to wrap pino-pretty in a custom module.
       *
       * @see {@link https://github.com/pinojs/pino-pretty?tab=readme-ov-file#handling-non-serializable-options pino-pretty docs}
       *
       * Then we need to resolve the module path to require the module and pass it to the `transport` option.
       */
      target: require.resolve('./pino-pretty-transport'),
    };
  }

  const pinoConfig: Params = {
    exclude: params.exclude || [],
    pinoHttp: pinoHttpConfig,
  };

  return pinoConfig;
};

/**
 * Allows for manipulating the parameters passed to logger methods (info, debug, error, etc.).
 * See {@link https://getpino.io/#/docs/api?id=logmethod docs}.
 *
 * By default, Pino serializes and interpolates all arguments after the `message`
 * according to any supplied printf-style placeholders (`%s`, `%d`, `%o`|`%O`|`%j`)
 * to form the final output msg value for the JSON log line.
 * - `%s` – string placeholder
 * - `%d` – digit placeholder
 * - `%O`, `%o`, and `%j` – object placeholder
 *
 * This means that if placeholders are not specified on the `message`, those arguments will not be logged.
 * This {@link https://getpino.io/#/docs/api?id=logging-method-parameters behavior} might cause problems to developers who doesn't know about this.
 *
 * To modify this behavior, we can handle the `interpolationValues` array in the `logMethod` function.
 * This way we can use the logger methods just like the regular `console.log` method.
 *
 * Note: Nestjs 8.0.0 and above also treats `interpolationValues` the same way as Pino,
 * where there should be printf-style placeholder for it in message argument or else it will not be logged.
 * See {@link https://github.com/iamolegga/nestjs-pino?tab=readme-ov-file#nestjs-loggerservice-interface-breaking-change}
 */
function logMethod(args: any[], method: (...args: any[]) => void) {
  /**
   * Destructured according to pino's {@link https://getpino.io/#/docs/api?id=logger-instance logging method signature}:
   *  logger.info([mergingObject], [message], [...interpolationValues])
   *
   * - `mergingObject` contains the context.
   * - `message` contains the message string.
   * - `interpolationValues` contains all log parameters after the message string.
   */
  const [mergingObject, message, ...interpolationValues] = args;

  let concatMessage = message;
  let newMergingObject = mergingObject;

  /**
   * Concatenate string args to the message and object args to the merging object.
   * @example
   * // logger.info('Hello', 'World!');
   * -> 'Hello World!'  // when prettified
   * -> { "msg": "Hello World!" }  // when not prettified
   *
   * // logger.info('test message', { foo: 'bar' });
   * -> 'test message { "foo": "bar" }'  // when prettified
   * -> { "msg": "test message", "foo": "bar" }  // when not prettified
   */
  for (const arg of interpolationValues) {
    if (typeof arg === 'object') {
      newMergingObject = Object.assign(mergingObject, arg);
    } else {
      concatMessage = `${concatMessage} ${arg}`;
    }
  }

  method.apply(this, [newMergingObject, concatMessage]);
}
