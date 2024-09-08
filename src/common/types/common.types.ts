/**
 * Type for making specific fields of an object `optional`;
 *
 * @example
 * type Todo = {
 *   title: string;
 *   description: string;
 * }
 *
 * const todo: Todo = { title: 'Title' }  // ❌ error
 * const todo: PartialBy<Todo, 'id'> = { title: 'Title' }  // ✅ works
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Type for combining string literals with string.
 * This gives you the ability to use string literals as autocomplete.
 *
 * @example
 * type T = 'foo' | 'bar'
 *
 * function print(str: T) {
 *   if (str === 'foo') {
 *     console.log('I have foo')
 *   } else if (str === 'bar') {
 *     console.log('I have bar')
 *   } else {
 *     // This won't be reached
 *     console.log('This is unknown', str);
 *   }
 * }
 *
 * function printLoose(str: LooseAutocomplete<T>) {
 *   if (str === 'foo') {
 *     console.log('I have foo')
 *   } else if (str === 'bar') {
 *     console.log('I have bar')
 *   } else {
 *     console.log('This is unknown', str);
 *   }
 * }
 *
 *
 * print('baz');  // ❌ type '"baz"' is not assignable to parameter of type 'T'
 * printLoose('baz');  // ✅ prints 'This is unknown baz'
 *
 */
export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
