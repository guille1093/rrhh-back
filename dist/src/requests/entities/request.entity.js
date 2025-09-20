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
exports.Request = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let Request = class Request {
    id;
    employee;
    type;
    description;
    date;
    status;
};
exports.Request = Request;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Request.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.requests, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", employee_entity_1.Employee)
], Request.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Request.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], Request.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Request.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'PENDIENTE' }),
    (0, swagger_1.ApiProperty)({ enum: ['PENDIENTE', 'APROBADA', 'RECHAZADA'] }),
    __metadata("design:type", String)
], Request.prototype, "status", void 0);
exports.Request = Request = __decorate([
    (0, typeorm_1.Entity)('requests')
], Request);
//# sourceMappingURL=request.entity.js.map