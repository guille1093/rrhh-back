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
var PositionsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const positions_service_1 = require("./positions.service");
const create_position_dto_1 = require("./dto/create-position.dto");
const update_position_dto_1 = require("./dto/update-position.dto");
const base_dto_1 = require("../base/dto/base.dto");
const base_controller_1 = require("../base/base.controller");
const auth_decorator_1 = require("../auth/auth.decorator");
let PositionsController = PositionsController_1 = class PositionsController extends base_controller_1.BaseController {
    positionsService;
    constructor() {
        super(PositionsController_1);
    }
    async create(createPositionDto) {
        const position = await this.positionsService.create(createPositionDto);
        return { status: 'success', data: position };
    }
    async findAll() {
        const positions = await this.positionsService.findAll();
        return { status: 'success', data: positions };
    }
    async findOne(id) {
        const position = await this.positionsService.findOne(Number(id));
        return { status: 'success', data: position };
    }
    async update(params, updatePositionDto) {
        const position = await this.positionsService.update(Number(params.id), updatePositionDto);
        return { status: 'success', data: position };
    }
    async remove(params) {
        const result = await this.positionsService.remove(Number(params.id));
        return { status: 'success', data: result };
    }
};
exports.PositionsController = PositionsController;
__decorate([
    (0, common_1.Inject)(positions_service_1.PositionsService),
    __metadata("design:type", positions_service_1.PositionsService)
], PositionsController.prototype, "positionsService", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:positions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Position' }),
    openapi.ApiResponse({ status: 201, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_position_dto_1.CreatePositionDto]),
    __metadata("design:returntype", Promise)
], PositionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:positions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all positions' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PositionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:positions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Position by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PositionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:positions'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Position' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        update_position_dto_1.UpdatePositionDto]),
    __metadata("design:returntype", Promise)
], PositionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:positions'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Position' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], PositionsController.prototype, "remove", null);
exports.PositionsController = PositionsController = PositionsController_1 = __decorate([
    (0, common_1.Controller)('positions'),
    (0, swagger_1.ApiTags)('Positions'),
    __metadata("design:paramtypes", [])
], PositionsController);
//# sourceMappingURL=positions.controller.js.map