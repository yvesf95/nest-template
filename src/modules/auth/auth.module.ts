import { DynamicModule } from '@nestjs/common';
import { AuthModuleOptions } from './auth.module-options';
import { JWT_AUTH_SERVICE } from './jwt/jwt-auth.service';

/**
 * This module serves as the global authentication module for the application.
 * - provides the auth guard and the corresponding decorators to use for guarding/protecting your routes.
 *
 * It does not have any implementations, but it is designed to be pluggable,
 * wherein you can inject the authentication provider you want to use.
 * (e.g.: Firebase Authentication, Auth0, <your own implementation>, etc.)
 *
 * @example
 * ```ts
 * AuthModule.forRoot({
 *  authModule: [FirebaseModule.forRoot({ serviceAccount: env.firebase })],
 *  jwt: { authService: FirebaseAuthService  // implements the IJwtAuthService },
 * });,
 * ```
 */
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    const authServiceProvider = { provide: JWT_AUTH_SERVICE, useClass: options.jwt.authService };
    return {
      global: true,
      module: AuthModule,
      imports: options.authModule || [],
      providers: [authServiceProvider],
      exports: [authServiceProvider],
    };
  }
}
