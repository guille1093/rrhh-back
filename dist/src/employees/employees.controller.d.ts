import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeePaginationDto } from './dto/employee.pagination.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
export declare class EmployeesController extends BaseController {
    private readonly employeesService;
    constructor();
    create(createEmployeeDto: CreateEmployeeDto): Promise<ResposeDTO>;
    findAll(query: EmployeePaginationDto): Promise<ResposeDTO>;
    findOne(id: number): Promise<ResposeDTO>;
    update(params: IdDTO, updateEmployeeDto: UpdateEmployeeDto): Promise<ResposeDTO>;
    remove(params: IdDTO): Promise<ResposeDTO>;
}
