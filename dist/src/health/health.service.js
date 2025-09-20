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
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const health_entity_1 = require("./entities/health.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let HealthService = class HealthService {
    healthRepository;
    employeeRepository;
    constructor(healthRepository, employeeRepository) {
        this.healthRepository = healthRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(createHealthDto) {
        const employee = await this.employeeRepository.findOneBy({
            id: createHealthDto.employeeId,
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const health = this.healthRepository.create({
            ...createHealthDto,
            employee,
        });
        return this.healthRepository.save(health);
    }
    async findAll() {
        return this.healthRepository.find({ relations: ['employee'] });
    }
    async findOne(id) {
        const health = await this.healthRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!health)
            throw new common_1.NotFoundException('Health record not found');
        return health;
    }
    async update(id, updateHealthDto) {
        const health = await this.findOne(id);
        if (updateHealthDto.employeeId) {
            const employee = await this.employeeRepository.findOneBy({
                id: updateHealthDto.employeeId,
            });
            if (!employee)
                throw new common_1.NotFoundException('Employee not found');
            health.employee = employee;
        }
        Object.assign(health, updateHealthDto);
        return this.healthRepository.save(health);
    }
    async remove(id) {
        await this.healthRepository.delete(id);
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(health_entity_1.Health)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HealthService);
//# sourceMappingURL=health.service.js.map