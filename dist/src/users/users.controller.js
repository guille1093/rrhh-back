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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base/dto/base.dto");
const base_controller_1 = require("../base/base.controller");
const user_dto_1 = require("./dto/user.dto");
const user_pagination_dto_1 = require("./dto/user.pagination.dto");
const auth_decorator_1 = require("../auth/auth.decorator");
let UsersController = UsersController_1 = class UsersController extends base_controller_1.BaseController {
    userService;
    jwtService;
    constructor() {
        super(UsersController_1);
    }
    async all(query) {
        const users = await this.userService.all({ query });
        return { status: 'success', data: users };
    }
    async getById(request, id) {
        const userDto = new user_dto_1.UserDto();
        userDto.id = id;
        const user = await this.userService.getBy(userDto);
        return { status: 'success', data: user };
    }
    async whoami(request) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return {
            status: 'success',
            data: request.user,
        };
    }
    async create(body) {
        const user = await this.userService.create({ body });
        return { status: 'success', data: user };
    }
    async update(params, body) {
        return {
            status: 'success',
            data: await this.userService.update({ id: params.id, body }),
        };
    }
    async delete(params) {
        const result = await this.userService.delete({ id: params.id });
        return { status: 'success', data: result };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Inject)(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], UsersController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_pagination_dto_1.UserPaginationDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('read:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get User by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('whoami'),
    (0, swagger_1.ApiOperation)({ summary: 'Get User by ID' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "whoami", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)('create:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)('update:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('delete:users'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete User' }),
    openapi.ApiResponse({ status: 200, type: require("../base/dto/base.dto").ResposeDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_dto_1.IdDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [])
], UsersController);
//# sourceMappingURL=users.controller.js.map