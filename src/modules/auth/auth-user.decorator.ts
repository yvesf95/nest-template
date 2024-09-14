import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './auth-user';

/**
 * Provides the authenticated user object to the route handler.
 *
 * @example
 * ```ts
 * // This must be used with an Authenticated decorator like `@JwtAuthenticated()`
 * async me(@AuthenticatedUser() user: AuthUser) {
 *   return user;
 * }
 * ```
 */
export const AuthenticatedUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  /** The user object that was injected in the `AuthGuard`. eg:`JwtAuthGuard`. */
  const user: AuthUser = request.user;
  return user;
});
