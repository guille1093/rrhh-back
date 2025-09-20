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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
let RolesService = class RolesService {
    roleRepository;
    permissionRepository;
    async getBy(id) {
        const role = await this.roleRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['permissions'],
        });
        if (!role)
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        return role;
    }
    async all(params) {
        const { offset = 0, pageSize = 10, orderBy = 'id', orderType = 'ASC', } = params.query;
        const [results, total] = await this.roleRepository.findAndCount({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['permissions'],
            skip: offset,
            take: pageSize,
            order: {
                [orderBy]: orderType,
            },
        });
        return {
            total,
            pageSize: pageSize,
            offset,
            results,
        };
    }
    async create(params) {
        if (await this.roleRepository.findOneBy({
            role: params.body.role,
        })) {
            throw new common_1.HttpException('Role already exists', common_1.HttpStatus.CONFLICT);
        }
        if (params.body.permissions && params.body.permissions.length > 0) {
            const permissions = await this.permissionRepository.find({
                where: { id: (0, typeorm_2.In)(params.body.permissions) },
            });
            params.body.permissions = permissions;
        }
        await this.roleRepository.save(this.roleRepository.create({
            ...params.body,
            createdAt: new Date(),
        }));
        const createdRole = await this.roleRepository.findOne({
            where: { role: params.body.role },
            relations: ['permissions'],
        });
        if (!createdRole) {
            throw new common_1.HttpException('Role not found after creation', common_1.HttpStatus.NOT_FOUND);
        }
        return createdRole;
    }
    async update(params) {
        const role = await this.roleRepository.findOne({
            where: { id: params.id },
        });
        if (!role) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (params.body.permissions && params.body.permissions.length > 0) {
            const permissions = await this.permissionRepository.find({
                where: { id: (0, typeorm_2.In)(params.body.permissions) },
            });
            role.permissions = permissions;
        }
        this.roleRepository.merge(role, params.body);
        role.updatedAt = new Date();
        await this.roleRepository.save(role);
        const updatedRole = await this.roleRepository.findOne({
            where: { id: params.id },
            relations: ['permissions'],
        });
        if (!updatedRole) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        return updatedRole;
    }
    async delete(params) {
        const role = await this.roleRepository.findOne({
            where: { id: params.id },
            relations: ['users'],
        });
        if (!role) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (role.users && role.users.length > 0) {
            throw new common_1.HttpException('Role has associated users and cannot be deleted', common_1.HttpStatus.CONFLICT);
        }
        const result = await this.roleRepository.softDelete(params.id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        const deletedRole = await this.roleRepository.findOne({
            where: { id: params.id },
            withDeleted: true,
        });
        if (!deletedRole) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        return deletedRole;
    }
    async allPermissions() {
        return await this.permissionRepository.find();
    }
};
exports.RolesService = RolesService;
__decorate([
    (0, typeorm_1.InjectRepository)(role_entity_1.Role),
    __metadata("design:type", typeorm_2.Repository)
], RolesService.prototype, "roleRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(permission_entity_1.Permission),
    __metadata("design:type", typeorm_2.Repository)
], RolesService.prototype, "permissionRepository", void 0);
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)()
], RolesService);
//# sourceMappingURL=roles.service.js.map