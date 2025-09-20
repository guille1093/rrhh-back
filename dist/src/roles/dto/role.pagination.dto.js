"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../../base/dto/base.dto");
const role_dto_1 = require("./role.dto");
class RolePaginationDto extends (0, swagger_1.IntersectionType)(base_dto_1.PaginationRequestDTO, role_dto_1.RoleDto) {
}
exports.RolePaginationDto = RolePaginationDto;
//# sourceMappingURL=role.pagination.dto.js.map