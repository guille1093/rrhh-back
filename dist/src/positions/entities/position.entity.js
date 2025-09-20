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
exports.Position = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const department_entity_1 = require("../../departments/entities/department.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const typeorm_2 = require("typeorm");
let Position = class Position {
    id;
    name;
    department;
    employees;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, department: { required: true, type: () => require("../../departments/entities/department.entity").Department }, employees: { required: true, type: () => [require("../../employees/entities/employee.entity").Employee] } };
    }
};
exports.Position = Position;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Position.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Position.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.positions, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_2.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Position.prototype, "department", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.position),
    __metadata("design:type", Array)
], Position.prototype, "employees", void 0);
exports.Position = Position = __decorate([
    (0, typeorm_1.Entity)('positions'),
    (0, typeorm_1.Index)(['name', 'department'], { unique: true })
], Position);
//# sourceMappingURL=position.entity.js.map