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
exports.Holiday = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Holiday = class Holiday {
    id;
    name;
    date;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, date: { required: true, type: () => Date }, type: { required: true, type: () => Object } };
    }
};
exports.Holiday = Holiday;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Holiday.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Holiday.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Holiday.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, default: 'NACIONAL' }),
    (0, swagger_1.ApiProperty)({ enum: ['NACIONAL', 'EMPRESA'] }),
    __metadata("design:type", String)
], Holiday.prototype, "type", void 0);
exports.Holiday = Holiday = __decorate([
    (0, typeorm_1.Entity)('holidays')
], Holiday);
//# sourceMappingURL=holiday.entity.js.map