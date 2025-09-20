"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_employee_dto_1 = require("./create-employee.dto");
class UpdateEmployeeDto extends (0, swagger_1.PartialType)(create_employee_dto_1.CreateEmployeeDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
//# sourceMappingURL=update-employee.dto.js.map