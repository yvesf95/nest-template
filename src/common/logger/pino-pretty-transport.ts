import pinoPretty, { PrettyOptions } from 'pino-pretty';

/**
 * Custom transport module for `pino-pretty`.
 * Note: The reason why we made this into a custom module is because not all options are serializable,
 * In this case, we are using `messageFormat` as a function, so we need to wrap pino-pretty in a custom module.
 *
 * @see {@link https://github.com/pinojs/pino-pretty?tab=readme-ov-file#handling-non-serializable-options pino-pretty docs}
 */
// module.exports = function pinoPrettyTransport(opts: PrettyOptions | undefined) {
export default function pinoPrettyTransport(opts?: PrettyOptions) {
  return pinoPretty({
    ...opts,
    singleLine: true,
    // messageFormat(log: any) {
    //   // if (log.req) return `${log.req.method} ${log.req.url} - ${log.responseTime}ms`;
    //   // return `${log.msg}`;
    //   return log.context ? `[${log.context}] ${log.msg}` : `${log.msg}`;
    // },
    messageFormat: (log, messageKey, levelLabel, { colors }) => {
      const context = log.context || '-';
      // `colors` is a Colorette object with colors enabled based on `colorize` option
      return `${colors.yellow(`[${context}]`)} ${log[messageKey]}`;
    },
  });
}
