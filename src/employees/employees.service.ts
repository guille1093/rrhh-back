import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Company } from '../companies/entities/company.entity';
import { EmployeePaginationDto } from './dto/employee.pagination.dto';
import { PaginationResponseDTO } from './../base/dto/base.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const department = await this.departmentRepository.findOneBy({
      id: createEmployeeDto.departmentId,
    });
    if (!department) throw new NotFoundException('Department not found');
    const position = await this.positionRepository.findOneBy({
      id: createEmployeeDto.positionId,
    });
    if (!position) throw new NotFoundException('Position not found');
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      department,
      position,
    });
    return this.employeeRepository.save(employee);
  }

  async findAll(query: EmployeePaginationDto): Promise<PaginationResponseDTO> {
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

    // Paginación
    const pageSize = query.pageSize ?? 10;
    const offset = query.offset ?? 0;
    qb.skip(offset).take(pageSize);

    // Ordenamiento
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

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: [
        'department',
        'position',
        'department.area',
        'department.area.company',
      ],
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    if (updateEmployeeDto.departmentId) {
      const department = await this.departmentRepository.findOneBy({
        id: updateEmployeeDto.departmentId,
      });
      if (!department) throw new NotFoundException('Department not found');
      employee.department = department;
    }
    if (updateEmployeeDto.positionId) {
      const position = await this.positionRepository.findOneBy({
        id: updateEmployeeDto.positionId,
      });
      if (!position) throw new NotFoundException('Position not found');
      employee.position = position;
    }
    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
