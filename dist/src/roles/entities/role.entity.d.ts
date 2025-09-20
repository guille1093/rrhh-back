import { User } from '@/users/entities/user.entity';
import { Permission } from '@/permissions/entities/permission.entity';
export declare class Role {
    id: number;
    role: string;
    description?: string;
    users: User[];
    permissions: Permission[];
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    toJSON(): Record<string, any>;
}
