import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { TYPES } from '../constants/general.constants';

/***
 * Set which type group  allowed to access this request.
 * @param types a single or array of users who is allowed to access this route.
 */
export const UserType = (...types: string[]): CustomDecorator =>
  SetMetadata(TYPES, types);
