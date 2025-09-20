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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const alerts_gateway_1 = require("../alerts/alerts.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_entity_1 = require("./entities/request.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let RequestsService = class RequestsService {
    requestRepository;
    employeeRepository;
    alertsGateway;
    constructor(requestRepository, employeeRepository, alertsGateway) {
        this.requestRepository = requestRepository;
        this.employeeRepository = employeeRepository;
        this.alertsGateway = alertsGateway;
    }
    async create(createRequestDto) {
        const employee = await this.employeeRepository.findOneBy({
            id: createRequestDto.employeeId,
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const request = this.requestRepository.create({
            ...createRequestDto,
            employee,
        });
        const savedRequest = await this.requestRepository.save(request);
        this.alertsGateway.emitNewRequestAlert({
            id: savedRequest.id,
            employee: {
                id: employee.id,
                name: `${employee.firstName} ${employee.lastName}`,
            },
            type: savedRequest.type,
            date: savedRequest.date,
            status: savedRequest.status,
        });
        return savedRequest;
    }
    async findAll() {
        return this.requestRepository.find({ relations: ['employee'] });
    }
    async findOne(id) {
        const request = await this.requestRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        return request;
    }
    async update(id, updateRequestDto) {
        const request = await this.findOne(id);
        if (updateRequestDto.employeeId) {
            const employee = await this.employeeRepository.findOneBy({
                id: updateRequestDto.employeeId,
            });
            if (!employee)
                throw new common_1.NotFoundException('Employee not found');
            request.employee = employee;
        }
        Object.assign(request, updateRequestDto);
        return this.requestRepository.save(request);
    }
    async remove(id) {
        await this.requestRepository.delete(id);
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        alerts_gateway_1.AlertsGateway])
], RequestsService);
//# sourceMappingURL=requests.service.js.map