import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedUserDto } from '../dto/authorized-user.dto';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    const data = request.user as AuthorizedUserDto;

    return data;
  },
);
