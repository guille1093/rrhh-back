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
var AreasController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const areas_service_1 = require("./areas.service");
const create_area_dto_1 = require("./dto/create-area.dto");
const update_area_dto_1 = require("./dto/update-area.dto");
const base_dto_1 = require("../base/dto/base.dto");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let AreasController = AreasController_1 = class AreasController extends base_controller_1.BaseController {
    areasService;
    constructor() {
        super(AreasController_1);
    }
    async create(createAreaDto) {
        const area = await this.areasService.create(createAreaDto);
        return { status: 'success', data: area };
    }
    async findAll() {
        const areas = await this.areasService.findAll();
        return { status: 'success', data: areas };
    }
    async findOne(id) {
        const area = await this.areasService.findOne(Number(id));
        return { status: 'success', data: area };
    }
    async update(params, updateAreaDto) {
        const area = await this.areasService.update(Number(params.id), updateAreaDto);
        return { status: 'success', data: area };
    }
    async remove(params) {
        const result = await this.areasService.remove(Number(params.id));
        return { status: 'success', data: result };
    }
};
exports.AreasController = AreasController;
__decorate([
    (0, common_1.Inject)(areas_service_1.AreasService),
    __metadata("design:type", areas_service_1.AreasService)
], AreasController.prototype, "areasService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Area' }),
    openapi.ApiResponse({ status: 201, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all areas' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Area by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Area' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        update_area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Area' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "remove", null);
exports.AreasController = AreasController = AreasController_1 = __decorate([
    (0, common_1.Controller)('areas'),
    (0, swagger_1.ApiTags)('Areas'),
    __metadata("design:paramtypes", [])
], AreasController);
//# sourceMappingURL=areas.controller.js.map