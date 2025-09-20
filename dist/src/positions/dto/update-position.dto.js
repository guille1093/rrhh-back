"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePositionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_position_dto_1 = require("./create-position.dto");
class UpdatePositionDto extends (0, swagger_1.PartialType)(create_position_dto_1.CreatePositionDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePositionDto = UpdatePositionDto;
//# sourceMappingURL=update-position.dto.js.map