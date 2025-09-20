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
var ReportsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let ReportsController = ReportsController_1 = class ReportsController extends base_controller_1.BaseController {
    reportsService;
    constructor() {
        super(ReportsController_1);
    }
    async getEmployeesCount() {
        return {
            status: 'success',
            data: await this.reportsService.getEmployeesCount(),
        };
    }
    async getEmployeesByStructure() {
        return {
            status: 'success',
            data: await this.reportsService.getEmployeesByStructure(),
        };
    }
    async getContractsTypes() {
        return {
            status: 'success',
            data: await this.reportsService.getContractsTypes(),
        };
    }
    async getContractsList() {
        return {
            status: 'success',
            data: await this.reportsService.getContractsList(),
        };
    }
    async getPendingRequests() {
        return {
            status: 'success',
            data: await this.reportsService.getPendingRequests(),
        };
    }
    async getUpcomingHolidays() {
        return {
            status: 'success',
            data: await this.reportsService.getUpcomingHolidays(),
        };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Inject)(reports_service_1.ReportsService),
    __metadata("design:type", reports_service_1.ReportsService)
], ReportsController.prototype, "reportsService", void 0);
__decorate([
    (0, common_1.Get)('employees-count'),
    (0, auth_decorator_1.Auth)('read:reports-employees-count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees count' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getEmployeesCount", null);
__decorate([
    (0, common_1.Get)('employees-by-structure'),
    (0, auth_decorator_1.Auth)('read:reports-employees-by-structure'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by structure' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getEmployeesByStructure", null);
__decorate([
    (0, common_1.Get)('contracts-types'),
    (0, auth_decorator_1.Auth)('read:reports-contracts-types'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contracts types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getContractsTypes", null);
__decorate([
    (0, common_1.Get)('contracts-list'),
    (0, auth_decorator_1.Auth)('read:reports-contracts-list'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contracts list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getContractsList", null);
__decorate([
    (0, common_1.Get)('pending-requests'),
    (0, auth_decorator_1.Auth)('read:reports-pending-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Get)('upcoming-holidays'),
    (0, auth_decorator_1.Auth)('read:reports-upcoming-holidays'),
    (0, swagger_1.ApiOperation)({ summary: 'Get upcoming holidays' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getUpcomingHolidays", null);
exports.ReportsController = ReportsController = ReportsController_1 = __decorate([
    (0, common_1.Controller)('reports'),
    (0, swagger_1.ApiTags)('Reports'),
    __metadata("design:paramtypes", [])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map