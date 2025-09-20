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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const area_entity_1 = require("../areas/entities/area.entity");
const position_entity_1 = require("../positions/entities/position.entity");
const contract_entity_1 = require("../employees/entities/contract.entity");
const request_entity_1 = require("../requests/entities/request.entity");
const holiday_entity_1 = require("../holidays/entities/holiday.entity");
let ReportsService = class ReportsService {
    employeeRepository;
    departmentRepository;
    areaRepository;
    positionRepository;
    contractRepository;
    requestRepository;
    holidayRepository;
    constructor(employeeRepository, departmentRepository, areaRepository, positionRepository, contractRepository, requestRepository, holidayRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.areaRepository = areaRepository;
        this.positionRepository = positionRepository;
        this.contractRepository = contractRepository;
        this.requestRepository = requestRepository;
        this.holidayRepository = holidayRepository;
    }
    async getEmployeesCount() {
        const total = await this.employeeRepository.count();
        const withIncidence = await this.requestRepository.count({
            where: { status: 'PENDIENTE' },
        });
        return { total, withIncidence };
    }
    async getEmployeesByStructure() {
        const result = await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.department', 'department')
            .leftJoinAndSelect('department.area', 'area')
            .leftJoinAndSelect('employee.position', 'position')
            .select([
            'area.name AS area',
            'department.name AS department',
            'position.name AS position',
            'COUNT(employee.id) AS count',
        ])
            .groupBy('area.name')
            .addGroupBy('department.name')
            .addGroupBy('position.name')
            .getRawMany();
        return result;
    }
    async getContractsTypes() {
        const result = await this.contractRepository
            .createQueryBuilder('contract')
            .select('contract.contractType', 'type')
            .addSelect('COUNT(contract.id)', 'count')
            .groupBy('contract.contractType')
            .getRawMany();
        return result;
    }
    async getContractsList() {
        return this.contractRepository.find({ relations: ['employee'] });
    }
    async getPendingRequests() {
        return this.requestRepository.find({
            where: { status: 'PENDIENTE' },
            relations: ['employee'],
        });
    }
    async getUpcomingHolidays() {
        const today = new Date();
        return this.holidayRepository
            .createQueryBuilder('holiday')
            .where('holiday.date >= :today', {
            today: today.toISOString().slice(0, 10),
        })
            .orderBy('holiday.date', 'ASC')
            .getMany();
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __param(3, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __param(4, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(5, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __param(6, (0, typeorm_1.InjectRepository)(holiday_entity_1.Holiday)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map