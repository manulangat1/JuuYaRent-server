import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizedUserDto } from '../dto/authorized-user.dto';
import { Reflector } from '@nestjs/core';
import { ADMIN_PERMISSIONS, TYPES } from '../constants/general.constants';
import { _400, _403 } from '../constants/error-messages';
import { AdminPermissions, Type } from '../constants/types.enum';
import { IS_PUBLIC_KEY } from '../decorators/Public.decorator';

@Injectable()
export class UserTypeGuard implements CanActivate {
  private logger = new Logger('User Type Logger');
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();

    const user = request.user as AuthorizedUserDto;

    if (!user) {
      return true;
    }

    const type = this.reflector.get<string[]>(TYPES, context.getHandler());

    if (!type) return true;

    if (!type.includes(user.type)) {
      throw new ForbiddenException(_403.ACCESS_DENIED);
    }

    const adminAllowedPermissions = this.reflector.get<string[]>(
      ADMIN_PERMISSIONS,
      context.getHandler,
    );

    if (user.type === Type.ADMIN && adminAllowedPermissions?.length) {
      const isAllowed = user.permissions?.some((permission: AdminPermissions) =>
        adminAllowedPermissions.includes(permission),
      );

      if (!isAllowed) throw new ForbiddenException(_403.ACCESS_DENIED);
    }
    return true;
  }
}
