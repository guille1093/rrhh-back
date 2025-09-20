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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const position_entity_1 = require("../positions/entities/position.entity");
let EmployeesService = class EmployeesService {
    employeeRepository;
    departmentRepository;
    positionRepository;
    constructor(employeeRepository, departmentRepository, positionRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
    }
    async create(createEmployeeDto) {
        const department = await this.departmentRepository.findOneBy({
            id: createEmployeeDto.departmentId,
        });
        if (!department)
            throw new common_1.NotFoundException('Department not found');
        const position = await this.positionRepository.findOneBy({
            id: createEmployeeDto.positionId,
        });
        if (!position)
            throw new common_1.NotFoundException('Position not found');
        const employee = this.employeeRepository.create({
            ...createEmployeeDto,
            department,
            position,
        });
        return this.employeeRepository.save(employee);
    }
    async findAll(query) {
        const qb = this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.department', 'department')
            .leftJoinAndSelect('employee.position', 'position')
            .leftJoinAndSelect('department.area', 'area')
            .leftJoinAndSelect('area.company', 'company');
        if (query.firstName) {
            qb.andWhere('employee.firstName ILIKE :firstName', {
                firstName: `%${query.firstName}%`,
            });
        }
        if (query.lastName) {
            qb.andWhere('employee.lastName ILIKE :lastName', {
                lastName: `%${query.lastName}%`,
            });
        }
        if (query.email) {
            qb.andWhere('employee.email ILIKE :email', { email: `%${query.email}%` });
        }
        if (query.companyId) {
            qb.andWhere('company.id = :companyId', { companyId: query.companyId });
        }
        if (query.departmentId) {
            qb.andWhere('department.id = :departmentId', {
                departmentId: query.departmentId,
            });
        }
        if (query.positionId) {
            qb.andWhere('position.id = :positionId', {
                positionId: query.positionId,
            });
        }
        const pageSize = query.pageSize ?? 10;
        const offset = query.offset ?? 0;
        qb.skip(offset).take(pageSize);
        if (query.orderBy) {
            qb.orderBy(`employee.${query.orderBy}`, query.orderType ?? 'ASC');
        }
        const [results, total] = await qb.getManyAndCount();
        return {
            total,
            pageSize,
            offset,
            results,
        };
    }
    async findOne(id) {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: [
                'department',
                'position',
                'department.area',
                'department.area.company',
            ],
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        return employee;
    }
    async update(id, updateEmployeeDto) {
        const employee = await this.findOne(id);
        if (updateEmployeeDto.departmentId) {
            const department = await this.departmentRepository.findOneBy({
                id: updateEmployeeDto.departmentId,
            });
            if (!department)
                throw new common_1.NotFoundException('Department not found');
            employee.department = department;
        }
        if (updateEmployeeDto.positionId) {
            const position = await this.positionRepository.findOneBy({
                id: updateEmployeeDto.positionId,
            });
            if (!position)
                throw new common_1.NotFoundException('Position not found');
            employee.position = position;
        }
        Object.assign(employee, updateEmployeeDto);
        return this.employeeRepository.save(employee);
    }
    async remove(id) {
        await this.employeeRepository.delete(id);
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map