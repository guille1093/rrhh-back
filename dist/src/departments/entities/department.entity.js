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
exports.Department = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const area_entity_1 = require("../../areas/entities/area.entity");
const position_entity_1 = require("../../positions/entities/position.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let Department = class Department {
    id;
    name;
    area;
    positions;
    employees;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, area: { required: true, type: () => require("../../areas/entities/area.entity").Area }, positions: { required: true, type: () => [require("../../positions/entities/position.entity").Position] }, employees: { required: true, type: () => [require("../../employees/entities/employee.entity").Employee] } };
    }
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_entity_1.Area, (area) => area.departments, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'area_id' }),
    __metadata("design:type", area_entity_1.Area)
], Department.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => position_entity_1.Position, (position) => position.department),
    __metadata("design:type", Array)
], Department.prototype, "positions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.department),
    __metadata("design:type", Array)
], Department.prototype, "employees", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)('departments'),
    (0, typeorm_1.Index)(['name', 'area'], { unique: true })
], Department);
//# sourceMappingURL=department.entity.js.map