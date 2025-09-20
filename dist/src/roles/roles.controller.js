"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const role_dto_1 = require("./dto/role.dto");
const base_dto_1 = require("../base/dto/base.dto");
const role_pagination_dto_1 = require("./dto/role.pagination.dto");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async permissions() {
        const permissions = await this.rolesService.allPermissions();
        return { status: 'success', data: permissions };
    }
    async getById(params) {
        const role = await this.rolesService.getBy(params.id);
        return { status: 'success', data: role };
    }
    async all(query) {
        const roles = await this.rolesService.all({ query });
        return { status: 'success', data: roles };
    }
    async create(body) {
        const role = await this.rolesService.create({ body });
        return { status: 'success', data: role };
    }
    async update(params, body) {
        const updatedRole = await this.rolesService.update({
            id: params.id,
            body,
        });
        return { status: 'success', data: updatedRole };
    }
    async delete(params) {
        const result = await this.rolesService.delete({ id: params.id });
        return { status: 'success', data: result };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "permissions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Role by ID' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_pagination_dto_1.RolePaginationDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Role' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Role' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Role' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map