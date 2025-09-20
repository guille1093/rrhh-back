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
var PermissionsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const base_controller_1 = require("../base/base.controller");
const swagger_1 = require("@nestjs/swagger");
let PermissionsController = PermissionsController_1 = class PermissionsController extends base_controller_1.BaseController {
    permissionsService;
    constructor() {
        super(PermissionsController_1);
    }
    findAll() {
        console.log('permissions.controller.ts -> findAll');
        return this.permissionsService.findAll();
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Inject)(permissions_service_1.PermissionsService),
    __metadata("design:type", permissions_service_1.PermissionsService)
], PermissionsController.prototype, "permissionsService", void 0);
__decorate([
    (0, common_1.Get)('/'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/permission.entity").Permission] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
exports.PermissionsController = PermissionsController = PermissionsController_1 = __decorate([
    (0, common_1.Controller)('permissions'),
    (0, swagger_1.ApiTags)('Permissions'),
    __metadata("design:paramtypes", [])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map