import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

/**
 * Method decorator used for protecting routes with JWT authentication.
 *
 * @example
 * ```ts
 * \@JwtAuthenticated()  // allows access only when the user is authenticated
 * \@Get()
 * async me(@AuthenticatedUser() user: AuthUser) {
 *   return user;
 * }
 * ```
 */
export function JwtAuthenticated() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: "Must provide 'Authorization' header to access this API.",
    }),
  );
}
