"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHolidayDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_holiday_dto_1 = require("./create-holiday.dto");
class UpdateHolidayDto extends (0, swagger_1.PartialType)(create_holiday_dto_1.CreateHolidayDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateHolidayDto = UpdateHolidayDto;
//# sourceMappingURL=update-holiday.dto.js.map