import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roule';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
