import { AuthUser } from '@/modules/auth';
import { DecodedToken, IJwtAuthService } from '@/modules/auth/jwt/jwt-auth.service';
import { Injectable } from '@nestjs/common';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class FirebaseAuthService implements IJwtAuthService {
  private readonly auth: Auth;

  constructor(firebaseAdminService: FirebaseAdminService) {
    this.auth = firebaseAdminService.getAuth();
  }

  async getUserByUid(uid: string): Promise<AuthUser> {
    const user = await this.auth.getUser(uid);
    return { uid: user.uid, email: user.email };
  }

  async getUserByEmail(email: string): Promise<AuthUser> {
    const user = await this.auth.getUserByEmail(email);
    return { uid: user.uid, email: user.email };
  }

  async verifyToken(token: string): Promise<DecodedToken> {
    const decodedToken = await this.auth.verifyIdToken(token);
    return { uid: decodedToken.uid, email: decodedToken.email, expirationDate: decodedToken.exp };
  }
}
