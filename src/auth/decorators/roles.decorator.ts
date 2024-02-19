import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/config/constants/key-decorators';
import { ROLES } from 'src/config/constants/roles';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
