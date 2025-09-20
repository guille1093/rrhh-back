import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from '@/departments/entities/department.entity';
import { Position } from '@/positions/entities/position.entity';
import { EmployeePaginationDto } from './dto/employee.pagination.dto';
import { PaginationResponseDTO } from '@/base/dto/base.dto';
export declare class EmployeesService {
    private readonly employeeRepository;
    private readonly departmentRepository;
    private readonly positionRepository;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>, positionRepository: Repository<Position>);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(query: EmployeePaginationDto): Promise<PaginationResponseDTO>;
    findOne(id: number): Promise<Employee>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    remove(id: number): Promise<void>;
}
