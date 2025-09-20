import { Role } from '../roles/entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePaginationDto } from './dto/role.pagination.dto';
export declare class RolesService {
    private readonly roleRepository;
    private readonly permissionRepository;
    getBy(id: number): Promise<Role>;
    all(params: {
        query: RolePaginationDto;
    }): Promise<PaginationResponseDTO>;
    create(params: {
        body: RoleDto;
    }): Promise<Role>;
    update(params: {
        id: number;
        body: RoleDto;
    }): Promise<Role>;
    delete(params: {
        id: number;
    }): Promise<Role>;
    allPermissions(): Promise<Permission[]>;
}
