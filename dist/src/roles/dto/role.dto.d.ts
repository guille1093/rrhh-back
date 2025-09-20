import { Permission } from '../../permissions/entities/permission.entity';
export declare class RoleDto {
    role: string;
    description?: string;
    permissions?: Permission[];
}
