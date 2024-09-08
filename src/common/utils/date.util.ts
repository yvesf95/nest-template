/**
 * Functions for date validation, manipulation, formatting, and etc.
 */

import { LooseAutocomplete } from '@/common/types/common.types';
import dayjs from 'dayjs';

export const DATE_ONLY_FORMAT = 'YYYY-MM-DD';
export const SHORT_DATE_FORMAT = 'MMM DD YYYY';

export type DateFormat = LooseAutocomplete<typeof DATE_ONLY_FORMAT | typeof SHORT_DATE_FORMAT>;

/**
 * Just a wrapper for `dayjs` for performing date operations.
 * - used to standardize usage of `dayjs` throughout the app.
 * - also don't reinvent the wheel.
 * @see {@link https://day.js.org/docs/en/parse/parse dayjs docs} on how to use `dayjs`.
 */
export function parse(date?: string | number | Date) {
  return dayjs(date);
}

/**
 * This returns a boolean indicating whether the provided date string is in the valid format.
 */
export function isValidFormat(date: string, format: DateFormat) {
  return dayjs(date, format as string).isValid();
}

/**
 * Formats date into "DD MMM YYYY".
 * - 'DD' - 01-31
 * - 'MMM' - Jan-Dec
 * - 'YYYY' - 2020
 *
 * @example
 * toShortDateFormat(new Date('2020-01-01')) // '01 Jan 2020'
 */
export function toShortDateFormat(date: Date) {
  return dayjs(date).format(SHORT_DATE_FORMAT);
}

/**
 * Formats date into "YYYY-MM-DD".
 * - 'YYYY' - 2020
 * - 'MM' - 01-12
 * - 'DD' - 01-31
 *
 * @example
 * toDateOnly(new Date('2020-01-01')) // '2020-01-01'
 */
export function toDateOnlyFormat(date: Date) {
  return dayjs(date).format(DATE_ONLY_FORMAT);
}
