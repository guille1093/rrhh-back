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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const area_entity_1 = require("../areas/entities/area.entity");
let DepartmentsService = class DepartmentsService {
    departmentRepository;
    areaRepository;
    constructor(departmentRepository, areaRepository) {
        this.departmentRepository = departmentRepository;
        this.areaRepository = areaRepository;
    }
    async create(createDepartmentDto) {
        const area = await this.areaRepository.findOneBy({
            id: createDepartmentDto.areaId,
        });
        if (!area)
            throw new common_1.NotFoundException('Area not found');
        const department = this.departmentRepository.create({
            ...createDepartmentDto,
            area,
        });
        return this.departmentRepository.save(department);
    }
    async findAll() {
        return this.departmentRepository.find({ relations: ['area'] });
    }
    async findOne(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['area'],
        });
        if (!department)
            throw new common_1.NotFoundException('Department not found');
        return department;
    }
    async update(id, updateDepartmentDto) {
        const department = await this.findOne(id);
        if (updateDepartmentDto.areaId) {
            const area = await this.areaRepository.findOneBy({
                id: updateDepartmentDto.areaId,
            });
            if (!area)
                throw new common_1.NotFoundException('Area not found');
            department.area = area;
        }
        Object.assign(department, updateDepartmentDto);
        return this.departmentRepository.save(department);
    }
    async remove(id) {
        await this.departmentRepository.delete(id);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map