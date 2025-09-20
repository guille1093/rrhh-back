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
var DepartmentsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departments_service_1 = require("./departments.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const base_dto_1 = require("../base/dto/base.dto");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let DepartmentsController = DepartmentsController_1 = class DepartmentsController extends base_controller_1.BaseController {
    departmentsService;
    constructor() {
        super(DepartmentsController_1);
    }
    async create(createDepartmentDto) {
        const department = await this.departmentsService.create(createDepartmentDto);
        return { status: 'success', data: department };
    }
    async findAll() {
        const departments = await this.departmentsService.findAll();
        return { status: 'success', data: departments };
    }
    async findOne(id) {
        const department = await this.departmentsService.findOne(Number(id));
        return { status: 'success', data: department };
    }
    async update(params, updateDepartmentDto) {
        const department = await this.departmentsService.update(Number(params.id), updateDepartmentDto);
        return { status: 'success', data: department };
    }
    async remove(params) {
        const result = await this.departmentsService.remove(Number(params.id));
        return { status: 'success', data: result };
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Inject)(departments_service_1.DepartmentsService),
    __metadata("design:type", departments_service_1.DepartmentsService)
], DepartmentsController.prototype, "departmentsService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Department' }),
    openapi.ApiResponse({ status: 201, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all departments' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Department by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Department' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Department' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = DepartmentsController_1 = __decorate([
    (0, common_1.Controller)('departments'),
    (0, swagger_1.ApiTags)('Departments'),
    __metadata("design:paramtypes", [])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map