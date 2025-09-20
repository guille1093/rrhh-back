import { Role } from '@/roles/entities/role.entity';
export declare class UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
