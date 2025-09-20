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
exports.Health = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let Health = class Health {
    id;
    employee;
    type;
    date;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, employee: { required: true, type: () => require("../../employees/entities/employee.entity").Employee }, type: { required: true, type: () => String }, date: { required: true, type: () => Date }, notes: { required: false, type: () => String } };
    }
};
exports.Health = Health;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Health.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.healthRecords, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", employee_entity_1.Employee)
], Health.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Health.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Health.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], Health.prototype, "notes", void 0);
exports.Health = Health = __decorate([
    (0, typeorm_1.Entity)('health_records')
], Health);
//# sourceMappingURL=health.entity.js.map