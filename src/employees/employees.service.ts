import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
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
    const position = await this.positionRepository.findOneBy({
      id: createEmployeeDto.positionId,
    });
    if (!position) throw new NotFoundException('Position not found');
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      position,
    });
    return this.employeeRepository.save(employee);
  }

  async findAll(query: EmployeePaginationDto): Promise<PaginationResponseDTO> {
    const qb = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.position', 'position')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('department.area', 'area')
      .leftJoinAndSelect('area.company', 'company')
      .leftJoinAndSelect('employee.contracts', 'contracts')
      .leftJoinAndSelect('employee.requests', 'requests')
      .leftJoinAndSelect('employee.healthRecords', 'healthRecords')
      .leftJoinAndSelect('employee.evaluations', 'evaluations')
      .leftJoinAndSelect('employee.familyMembers', 'familyMembers')
      .leftJoinAndSelect('employee.emergencyContacts', 'emergencyContacts');

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
    if (query.areaId) {
      qb.andWhere('area.id = :areaId', {
        areaId: query.areaId,
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
        'position',
        'position.department',
        'position.department.area',
        'position.department.area.company',
        'emergencyContacts',
        'healthRecords',
        'evaluations',
        'familyMembers',
        'emergencyContacts',
        'contracts',
        'requests',
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

  async getCompanyReport(companyId: number) {
    // 1. Cantidad de empleados por empresa
    const totalEmployees = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.position', 'position')
      .leftJoin('position.department', 'department')
      .leftJoin('department.area', 'area')
      .leftJoin('area.company', 'company')
      .where('company.id = :companyId', { companyId })
      .getCount();

    // 2. Cantidad de empleados activos en el sistema
    const activeEmployees = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.position', 'position')
      .leftJoin('position.department', 'department')
      .leftJoin('department.area', 'area')
      .leftJoin('area.company', 'company')
      .where('company.id = :companyId', { companyId })
      .getCount();

    // 3. Cantidad de empleados por Área – Departamento - Puesto
    const byAreaDeptPosition = await this.employeeRepository
      .createQueryBuilder('employee')
      .select([
        'area.id as areaId',
        'area.name as areaName',
        'department.id as departmentId',
        'department.name as departmentName',
        'position.id as positionId',
        'position.name as positionName',
        'COUNT(employee.id) as employeeCount',
      ])
      .leftJoin('employee.position', 'position')
      .leftJoin('position.department', 'department')
      .leftJoin('department.area', 'area')
      .leftJoin('area.company', 'company')
      .where('company.id = :companyId', { companyId })
      .groupBy('area.id, department.id, position.id')
      .getRawMany();

    // 4. Empleados por Tipos de contratos (empleados únicos por tipo)
    // 4. Empleados por Tipos de contratos (empleados únicos por contractType)
    const byContractType = await this.employeeRepository
      .createQueryBuilder('employee')
      .select([
        'contracts.contractType as contractType',
        'COUNT(DISTINCT employee.id) as employeeCount',
      ])
      .leftJoin('employee.contracts', 'contracts')
      .leftJoin('employee.position', 'position')
      .leftJoin('position.department', 'department')
      .leftJoin('department.area', 'area')
      .leftJoin('area.company', 'company')
      .where('company.id = :companyId', { companyId })
      .andWhere('contracts.contractType IS NOT NULL')
      .groupBy('contracts.contractType')
      .getRawMany();

    // 5. Contratos registrados historial con fechas para gráfico
    const contractsHistory = await this.employeeRepository
      .createQueryBuilder('employee')
      .select([
        'contracts.id as contractId',
        'contracts.startDate as startDate',
        'contracts.endDate as endDate',
        'employee.id as employeeId',
        'employee.firstName as employeeFirstName',
        'employee.lastName as employeeLastName',
      ])
      .leftJoin('employee.contracts', 'contracts')
      .leftJoin('employee.position', 'position')
      .leftJoin('position.department', 'department')
      .leftJoin('department.area', 'area')
      .leftJoin('area.company', 'company')
      .where('company.id = :companyId', { companyId })
      .getRawMany();
    return {
      totalEmployees,
      activeEmployees,
      byAreaDeptPosition,
      byContractType,
      contractsHistory,
    };
  }
}
