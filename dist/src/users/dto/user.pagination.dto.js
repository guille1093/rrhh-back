"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../../base/dto/base.dto");
const user_dto_1 = require("./user.dto");
class UserPaginationDto extends (0, swagger_1.IntersectionType)(base_dto_1.PaginationRequestDTO, user_dto_1.UserDto) {
}
exports.UserPaginationDto = UserPaginationDto;
//# sourceMappingURL=user.pagination.dto.js.map