import { AuthUser } from '@/modules/auth';
import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FirebaseAuthGuard } from './firebase-auth.guard';

export function FireAuthenticated() {
  return applyDecorators(
    UseGuards(FirebaseAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: "Must provide 'Authorization' header to access this API.",
    }),
  );
}

export const LoggedInUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  /** The user object is injected in the `AuthGuard`. */
  const user: AuthUser = request.user;
  return user;
});
