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
var EmployeesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const employee_pagination_dto_1 = require("./dto/employee.pagination.dto");
const base_dto_1 = require("../base/dto/base.dto");
const common_2 = require("@nestjs/common");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let EmployeesController = EmployeesController_1 = class EmployeesController extends base_controller_1.BaseController {
    employeesService;
    constructor() {
        super(EmployeesController_1);
    }
    async create(createEmployeeDto) {
        const employee = await this.employeesService.create(createEmployeeDto);
        return { status: 'success', data: employee };
    }
    async findAll(query) {
        const employees = await this.employeesService.findAll(query);
        return { status: 'success', data: employees };
    }
    async findOne(id) {
        const employee = await this.employeesService.findOne(Number(id));
        const department = employee.department;
        const area = department?.area;
        const company = area?.company;
        const position = employee.position;
        const nested = {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            company: company && {
                id: company.id,
                name: company.name,
                address: company.address,
                phone: company.phone,
                email: company.email,
                industry: company.industry,
                area: area && {
                    id: area.id,
                    name: area.name,
                    department: department && {
                        id: department.id,
                        name: department.name,
                        position: position && {
                            id: position.id,
                            name: position.name,
                        },
                    },
                },
            },
        };
        return { status: 'success', data: nested };
    }
    async update(params, updateEmployeeDto) {
        const employee = await this.employeesService.update(Number(params.id), updateEmployeeDto);
        return { status: 'success', data: employee };
    }
    async remove(params) {
        const result = await this.employeesService.remove(Number(params.id));
        return { status: 'success', data: result };
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Inject)(employees_service_1.EmployeesService),
    __metadata("design:type", employees_service_1.EmployeesService)
], EmployeesController.prototype, "employeesService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:employees'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Employee' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:employees'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all employees (paginated, filterable)' }),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_pagination_dto_1.EmployeePaginationDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:employees'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Employee by ID (nested by hierarchy)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:employees'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Employee' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:employees'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Employee' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "remove", null);
exports.EmployeesController = EmployeesController = EmployeesController_1 = __decorate([
    (0, common_1.Controller)('employees'),
    (0, swagger_1.ApiTags)('Employees'),
    __metadata("design:paramtypes", [])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map