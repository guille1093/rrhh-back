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
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evaluation_entity_1 = require("./entities/evaluation.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let EvaluationsService = class EvaluationsService {
    evaluationRepository;
    employeeRepository;
    constructor(evaluationRepository, employeeRepository) {
        this.evaluationRepository = evaluationRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(createEvaluationDto) {
        const employee = await this.employeeRepository.findOneBy({
            id: createEvaluationDto.employeeId,
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const evaluation = this.evaluationRepository.create({
            ...createEvaluationDto,
            employee,
        });
        return this.evaluationRepository.save(evaluation);
    }
    async findAll() {
        return this.evaluationRepository.find({ relations: ['employee'] });
    }
    async findOne(id) {
        const evaluation = await this.evaluationRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!evaluation)
            throw new common_1.NotFoundException('Evaluation not found');
        return evaluation;
    }
    async update(id, updateEvaluationDto) {
        const evaluation = await this.findOne(id);
        if (updateEvaluationDto.employeeId) {
            const employee = await this.employeeRepository.findOneBy({
                id: updateEvaluationDto.employeeId,
            });
            if (!employee)
                throw new common_1.NotFoundException('Employee not found');
            evaluation.employee = employee;
        }
        Object.assign(evaluation, updateEvaluationDto);
        return this.evaluationRepository.save(evaluation);
    }
    async remove(id) {
        await this.evaluationRepository.delete(id);
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map