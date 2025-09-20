"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = UsersService_1 = class UsersService {
    userRepository;
    async getBy(body) {
        console.log('body', body);
        const user = await this.userRepository.findOne({
            where: {
                id: body.id,
                email: body.email,
            },
            relations: ['role', 'role.permissions'],
        });
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async getByEmailWithPassword(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'firstName', 'lastName', 'role'],
            relations: ['role', 'role.permissions'],
        });
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async all(params) {
        const emptyResponse = {
            total: 0,
            pageSize: 0,
            offset: params.query.offset ?? 0,
            results: [],
        };
        try {
            if (Object.keys(params.query).length === 0) {
                return emptyResponse;
            }
            if (params.query.pageSize?.toString() === '0') {
                return emptyResponse;
            }
            const order = {};
            if (params.query.orderBy && params.query.orderType) {
                order[params.query.orderBy] = params.query.orderType;
            }
            const forPage = params.query.pageSize
                ? parseInt(params.query.pageSize.toString(), 10) || 10
                : 10;
            const skip = params.query.offset;
            const [users, total] = await this.userRepository.findAndCount({
                where: {
                    firstName: params.query.firstName
                        ? (0, typeorm_2.Like)(`%${params.query.firstName}%`)
                        : undefined,
                    lastName: params.query.lastName
                        ? (0, typeorm_2.Like)(`%${params.query.lastName}%`)
                        : undefined,
                    email: params.query.email
                        ? (0, typeorm_2.Like)(`%${params.query.email}%`)
                        : undefined,
                },
                relations: ['role', 'role.permissions'],
                order,
                take: forPage,
                skip: skip,
            });
            return {
                total: total,
                pageSize: forPage,
                offset: params.query.offset || 0,
                results: users,
            };
        }
        catch (error) {
            throw new Error(`${UsersService_1.name}[all]:${error}`);
        }
    }
    async create(params) {
        const existingUser = await this.userRepository.findOne({
            where: { email: params.body.email },
            withDeleted: true,
        });
        if (existingUser) {
            if (existingUser.deletedAt) {
                throw new common_1.HttpException('Inactive user already exists', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
            }
        }
        await this.userRepository.save(this.userRepository.create({
            ...params.body,
            password: await this._hashPassword(params.body.password),
            createdAt: new Date(),
        }));
        const user = await this.userRepository.findOne({
            where: { email: params.body.email },
            relations: ['role', 'role.permissions'],
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(params) {
        const user = await this.userRepository.findOne({
            where: { id: params.id, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        params.body.password = params.body.password
            ? await this._hashPassword(params.body.password)
            : params.body.password;
        this.userRepository.merge(user, params.body);
        await this.userRepository.save(user);
        const updatedUser = await this.userRepository.findOne({
            where: { id: params.id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['role', 'role.permissions'],
        });
        if (!updatedUser) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return updatedUser;
    }
    async delete(params) {
        const result = await this.userRepository.softDelete(params.id);
        if (result.affected === 0) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const user = await this.userRepository.findOne({
            where: { id: params.id },
            withDeleted: true,
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async _hashPassword(password) {
        const salt = await bcrypt.genSalt(8);
        return await bcrypt.hash(password, salt);
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "userRepository", void 0);
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map