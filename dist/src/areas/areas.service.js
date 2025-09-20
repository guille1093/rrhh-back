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
exports.AreasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const area_entity_1 = require("./entities/area.entity");
const company_entity_1 = require("../companies/entities/company.entity");
let AreasService = class AreasService {
    areaRepository;
    companyRepository;
    constructor(areaRepository, companyRepository) {
        this.areaRepository = areaRepository;
        this.companyRepository = companyRepository;
    }
    async create(createAreaDto) {
        const company = await this.companyRepository.findOneBy({
            id: createAreaDto.companyId,
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        const area = this.areaRepository.create({ ...createAreaDto, company });
        return this.areaRepository.save(area);
    }
    async findAll() {
        return this.areaRepository.find({ relations: ['company'] });
    }
    async findOne(id) {
        const area = await this.areaRepository.findOne({
            where: { id },
            relations: ['company'],
        });
        if (!area)
            throw new common_1.NotFoundException('Area not found');
        return area;
    }
    async update(id, updateAreaDto) {
        const area = await this.findOne(id);
        if (updateAreaDto.companyId) {
            const company = await this.companyRepository.findOneBy({
                id: updateAreaDto.companyId,
            });
            if (!company)
                throw new common_1.NotFoundException('Company not found');
            area.company = company;
        }
        Object.assign(area, updateAreaDto);
        return this.areaRepository.save(area);
    }
    async remove(id) {
        await this.areaRepository.delete(id);
    }
};
exports.AreasService = AreasService;
exports.AreasService = AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AreasService);
//# sourceMappingURL=areas.service.js.map