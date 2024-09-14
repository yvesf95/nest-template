import { AuthUser } from '../auth-user';

export const JWT_AUTH_SERVICE = 'JWT_AUTH_SERVICE';

export type DecodedToken = {
  uid: string;
  email?: string;
  expirationDate: number;
};

export interface IJwtAuthService {
  /**
   * Gets the user data for the user corresponding to a given uid.
   * @param uid — The uid corresponding to the user whose data to fetch.
   * @returns A promise fulfilled with the user data corresponding to the provided uid.
   */
  getUserByUid(uid: string): Promise<AuthUser>;

  /**
   * Gets the user data for the user corresponding to a given email.
   * @param email The email corresponding to the user whose data to fetch.
   * @returns A promise fulfilled with the user data corresponding to the provided email.
   */
  getUserByEmail(email: string): Promise<AuthUser>;

  /**
   * Verifies a JWT token.
   * If the token is valid, the promise is fulfilled with the token's decoded claims;
   * otherwise, the promise is rejected.
   * @param idToken The token to verify.
   * @returns A promise fulfilled with the token's decoded claims.
   */
  verifyToken(idToken: string): Promise<DecodedToken>;
}
