import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly authService: FirebaseAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const idToken = request.headers.authorization.replace('Bearer', '').trim();
    if (!idToken) {
      throw new UnauthorizedException();
    }

    const claims = await this.authService.verifyToken(idToken);

    if (claims.uid === undefined) {
      throw new UnauthorizedException();
    }

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request.user = {
      _id: claims.uid,
      email: claims.email,
    };

    return true;
  }
}
