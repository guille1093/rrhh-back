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
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_decorator_1 = require("./auth.decorator");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let PermissionsGuard = class PermissionsGuard {
    reflector;
    jwtService;
    usersService;
    constructor(reflector, jwtService, usersService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(auth_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.ForbiddenException('Token not provided');
        }
        let decoded;
        try {
            decoded = this.jwtService.verify(token);
        }
        catch (error) {
            console.error('Token verification failed:', error);
            throw new common_1.ForbiddenException('Invalid token', error);
        }
        console.log('decoded', decoded.id);
        const user = await this.usersService.getBy(decoded.id);
        request.user = user;
        const userPermissions = user.role.permissions.map((permission) => permission.permission);
        const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));
        if (!hasPermission) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        users_service_1.UsersService])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map