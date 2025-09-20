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
exports.Employee = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contract_entity_1 = require("./contract.entity");
const request_entity_1 = require("../../requests/entities/request.entity");
const health_entity_1 = require("../../health/entities/health.entity");
const evaluation_entity_1 = require("../../evaluations/entities/evaluation.entity");
const swagger_1 = require("@nestjs/swagger");
const department_entity_1 = require("../../departments/entities/department.entity");
const position_entity_1 = require("../../positions/entities/position.entity");
let Employee = class Employee {
    id;
    firstName;
    lastName;
    email;
    department;
    position;
    contracts;
    requests;
    healthRecords;
    evaluations;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, department: { required: true, type: () => require("../../departments/entities/department.entity").Department }, position: { required: true, type: () => require("../../positions/entities/position.entity").Position }, contracts: { required: true, type: () => [require("./contract.entity").Contract] }, requests: { required: true, type: () => [require("../../requests/entities/request.entity").Request] }, healthRecords: { required: true, type: () => [require("../../health/entities/health.entity").Health] }, evaluations: { required: true, type: () => [require("../../evaluations/entities/evaluation.entity").Evaluation] } };
    }
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.employees, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", department_entity_1.Department)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, (position) => position.employees, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", position_entity_1.Position)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contract_entity_1.Contract, (contract) => contract.employee),
    __metadata("design:type", Array)
], Employee.prototype, "contracts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.employee),
    __metadata("design:type", Array)
], Employee.prototype, "requests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => health_entity_1.Health, (health) => health.employee),
    __metadata("design:type", Array)
], Employee.prototype, "healthRecords", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluation_entity_1.Evaluation, (evaluation) => evaluation.employee),
    __metadata("design:type", Array)
], Employee.prototype, "evaluations", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map