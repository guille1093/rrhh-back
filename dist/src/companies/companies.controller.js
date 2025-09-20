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
var CompaniesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const companies_service_1 = require("./companies.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const base_dto_1 = require("../base/dto/base.dto");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let CompaniesController = CompaniesController_1 = class CompaniesController extends base_controller_1.BaseController {
    companiesService;
    constructor() {
        super(CompaniesController_1);
    }
    async create(createCompanyDto) {
        const company = await this.companiesService.create(createCompanyDto);
        return { status: 'success', data: company };
    }
    async findAll() {
        const companies = await this.companiesService.findAll();
        return { status: 'success', data: companies };
    }
    async findOne(id) {
        const company = await this.companiesService.findOne(Number(id));
        return { status: 'success', data: company };
    }
    async update(params, updateCompanyDto) {
        const company = await this.companiesService.update(Number(params.id), updateCompanyDto);
        return { status: 'success', data: company };
    }
    async remove(params) {
        const result = await this.companiesService.remove(Number(params.id));
        return { status: 'success', data: result };
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Inject)(companies_service_1.CompaniesService),
    __metadata("design:type", companies_service_1.CompaniesService)
], CompaniesController.prototype, "companiesService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Company' }),
    openapi.ApiResponse({ status: 201, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Company by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Company' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:companies'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Company' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = CompaniesController_1 = __decorate([
    (0, common_1.Controller)('companies'),
    (0, swagger_1.ApiTags)('Companies'),
    __metadata("design:paramtypes", [])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map