import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserDocument = request.user;

    // Check if the user is present and is_verified is true
    if (user && user.is_verified) {
      return true;
    }

    // If not verified, throw a ForbiddenException
    throw new ForbiddenException('Access denied. User is not verified.');
  }
}
