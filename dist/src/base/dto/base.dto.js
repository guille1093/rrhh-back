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
exports.RoleDto = exports.IdDTO = exports.ResposeDTO = exports.PaginationResponseDTO = exports.PaginationRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationRequestDTO {
    offset;
    pageSize;
    orderBy;
    orderType;
}
exports.PaginationRequestDTO = PaginationRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaginationRequestDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value),
    __metadata("design:type", Number)
], PaginationRequestDTO.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationRequestDTO.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: 'string', default: 'ASC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaginationRequestDTO.prototype, "orderType", void 0);
class PaginationResponseDTO {
    total;
    pageSize;
    offset;
    results;
}
exports.PaginationResponseDTO = PaginationResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationResponseDTO.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationResponseDTO.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PaginationResponseDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Array)
], PaginationResponseDTO.prototype, "results", void 0);
class ResposeDTO {
    status;
    data;
}
exports.ResposeDTO = ResposeDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResposeDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ResposeDTO.prototype, "data", void 0);
class IdDTO {
    id;
}
exports.IdDTO = IdDTO;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], IdDTO.prototype, "id", void 0);
class RoleDto {
    offset;
    limit;
    orderBy;
    orderType;
}
exports.RoleDto = RoleDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RoleDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], RoleDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleDto.prototype, "orderBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], RoleDto.prototype, "orderType", void 0);
//# sourceMappingURL=base.dto.js.map