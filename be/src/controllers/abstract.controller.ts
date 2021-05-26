import {SetMetadata} from '@nestjs/common';
import {Role} from 'generator';

const baseGuard = (...roles: Role[]) => SetMetadata('roles', roles);

export const RolesGuard = baseGuard;

export const AnyRoleGuard = () => baseGuard(Role.ROLE_ADMIN, Role.ROLE_CLIENT);
export const AdminRoleGuard = baseGuard(Role.ROLE_ADMIN);
export const ClientRoleGuard = baseGuard(Role.ROLE_CLIENT);


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
