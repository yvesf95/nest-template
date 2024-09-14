import { ModuleMetadata, Type } from '@nestjs/common';
import { IJwtAuthService } from './jwt/jwt-auth.service';

export type AuthModuleOptions = {
  /** The auth module containing the implementation of the auth service to use by this module. */
  authModule: ModuleMetadata['imports'];
  /** Options for JWT auth. */
  jwt: {
    /** The JWT auth service implementation to use by this module. */
    authService: Type<IJwtAuthService>;
  };
};
