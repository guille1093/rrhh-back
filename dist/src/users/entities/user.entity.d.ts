import { Role } from '@/roles/entities/role.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailToken: string | null;
    emailVerifiedAt: Date | null;
    emailChange: string | null;
    password: string;
    rememberToken: string | null;
    branchOfficeId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    role: Role;
    toJSON(): Record<string, any>;
}
