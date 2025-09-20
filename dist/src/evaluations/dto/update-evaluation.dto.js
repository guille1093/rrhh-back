"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEvaluationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_evaluation_dto_1 = require("./create-evaluation.dto");
class UpdateEvaluationDto extends (0, swagger_1.PartialType)(create_evaluation_dto_1.CreateEvaluationDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEvaluationDto = UpdateEvaluationDto;
//# sourceMappingURL=update-evaluation.dto.js.map