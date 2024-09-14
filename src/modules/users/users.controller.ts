import { Controller, Get } from '@nestjs/common';
import { AuthenticatedUser, AuthUser } from '../auth';
import { JwtAuthenticated } from '../auth/jwt';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @JwtAuthenticated()
  @Get('me')
  async me(@AuthenticatedUser() user: AuthUser) {
    return user;
  }
}
