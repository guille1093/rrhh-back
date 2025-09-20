import { RolesService } from '../roles/roles.service';
import { RoleDto } from '../roles/dto/role.dto';
import { IdDTO, ResposeDTO } from '../base/dto/base.dto';
import { RolePaginationDto } from './dto/role.pagination.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    permissions(): Promise<ResposeDTO>;
    getById(params: IdDTO): Promise<ResposeDTO>;
    all(query: RolePaginationDto): Promise<ResposeDTO>;
    create(body: RoleDto): Promise<ResposeDTO>;
    update(params: IdDTO, body: RoleDto): Promise<ResposeDTO>;
    delete(params: IdDTO): Promise<ResposeDTO>;
}
