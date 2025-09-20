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
exports.Area = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const company_entity_1 = require("../../companies/entities/company.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
let Area = class Area {
    id;
    name;
    company;
    departments;
};
exports.Area = Area;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Area.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Area.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.Company)
], Area.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (department) => department.area),
    __metadata("design:type", Array)
], Area.prototype, "departments", void 0);
exports.Area = Area = __decorate([
    (0, typeorm_1.Entity)('areas'),
    (0, typeorm_1.Index)(['name', 'company'], { unique: true })
], Area);
//# sourceMappingURL=area.entity.js.map