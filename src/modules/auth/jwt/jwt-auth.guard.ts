import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IJwtAuthService, JWT_AUTH_SERVICE } from './jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JWT_AUTH_SERVICE) private readonly authService: IJwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const idToken = request.headers.authorization?.replace('Bearer', '').trim();
    if (!idToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.verifyToken(idToken);

    if (user.uid === undefined) {
      throw new UnauthorizedException();
    }

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request.user = {
      _id: user.uid,
      email: user.email,
    };

    return true;
  }
}
