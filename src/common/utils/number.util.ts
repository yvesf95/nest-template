/**
 * Functions for decimal validation, manipulation, formatting, and etc.
 * - used for handling significant decimal values in the app.
 */

import Decimal from 'decimal.js';

/**
 * Just a wrapper for `decimal.js` for performing decimal operations.
 * - used to standardize usage of `decimal.js` throughout the app.
 * @see {@link https://www.npmjs.com/package/decimal.js decimal.js docs} `decimal.js` usage.
 *
 * - used to address the floating point precision issue in JS.
 * @see {@link https://www.smashingmagazine.com/2023/12/making-sense-of-senseless-javascript-features/#0-1-0-2-and-the-floating-point-format floating point issue}
 */
export function parse(num: number) {
  return new Decimal(num);
}
