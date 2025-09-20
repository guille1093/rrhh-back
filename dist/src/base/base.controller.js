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
exports.BaseController = void 0;
const permissions_guard_1 = require("../auth/permissions.guard");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let BaseController = class BaseController {
    object;
    logger;
    constructor(object) {
        this.object = object;
        this.logger = new common_1.Logger(this.object.name);
    }
};
exports.BaseController = BaseController;
exports.BaseController = BaseController = __decorate([
    (0, common_2.UseGuards)(permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [Object])
], BaseController);
//# sourceMappingURL=base.controller.js.map