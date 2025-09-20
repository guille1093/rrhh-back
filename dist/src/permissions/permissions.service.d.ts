import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    private readonly permissionRepository;
    findAll(): Promise<Permission[]>;
}
