"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHealthDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_health_dto_1 = require("./create-health.dto");
class UpdateHealthDto extends (0, swagger_1.PartialType)(create_health_dto_1.CreateHealthDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateHealthDto = UpdateHealthDto;
//# sourceMappingURL=update-health.dto.js.map