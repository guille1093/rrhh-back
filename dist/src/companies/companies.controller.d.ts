import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
export declare class CompaniesController extends BaseController {
    private readonly companiesService;
    constructor();
    create(createCompanyDto: CreateCompanyDto): Promise<ResposeDTO>;
    findAll(): Promise<ResposeDTO>;
    findOne(id: number): Promise<ResposeDTO>;
    update(params: IdDTO, updateCompanyDto: UpdateCompanyDto): Promise<ResposeDTO>;
    remove(params: IdDTO): Promise<ResposeDTO>;
}
