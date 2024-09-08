import { z } from 'zod';

const emptyObjectSchema = z.object({}).strict();

/**
 * Checks if the object is empty.
 * @param obj The object to check if empty
 * @returns `true` if the object is empty, `false` otherwise
 */
export const isEmpty = (obj: object): boolean => {
  // return Object.keys(obj).length === 0 && obj.constructor === Object;
  const result = emptyObjectSchema.safeParse(obj);
  return result.success;
};
