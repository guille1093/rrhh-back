import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { IdDTO, ResposeDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
export declare class DepartmentsController extends BaseController {
    private readonly departmentsService;
    constructor();
    create(createDepartmentDto: CreateDepartmentDto): Promise<ResposeDTO>;
    findAll(): Promise<ResposeDTO>;
    findOne(id: number): Promise<ResposeDTO>;
    update(params: IdDTO, updateDepartmentDto: UpdateDepartmentDto): Promise<ResposeDTO>;
    remove(params: IdDTO): Promise<ResposeDTO>;
}
