import { Role } from '@/roles/entities/role.entity';
export declare class Permission {
    id: number;
    permission: string;
    description?: string;
    roles: Role[];
}
