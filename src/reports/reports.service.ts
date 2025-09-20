import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '@/employees/entities/employee.entity';
import { Department } from '@/departments/entities/department.entity';
import { Area } from '@/areas/entities/area.entity';
import { Position } from '@/positions/entities/position.entity';
import { Contract } from '@/employees/entities/contract.entity';
import { Request } from '@/requests/entities/request.entity';
import { Holiday } from '@/holidays/entities/holiday.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
  ) {}

  async getEmployeesCount() {
    const total = await this.employeeRepository.count();
    const withIncidence = await this.requestRepository.count({
      where: { status: 'PENDIENTE' },
    });
    return { total, withIncidence };
  }

  async getEmployeesByStructure() {
    // Agrupa empleados por área, departamento y puesto
    const result = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .leftJoinAndSelect('department.area', 'area')
      .leftJoinAndSelect('employee.position', 'position')
      .select([
        'area.name AS area',
        'department.name AS department',
        'position.name AS position',
        'COUNT(employee.id) AS count',
      ])
      .groupBy('area.name')
      .addGroupBy('department.name')
      .addGroupBy('position.name')
      .getRawMany();
    return result;
  }

  async getContractsTypes() {
    const result = await this.contractRepository
      .createQueryBuilder('contract')
      .select('contract.contractType', 'type')
      .addSelect('COUNT(contract.id)', 'count')
      .groupBy('contract.contractType')
      .getRawMany();
    return result;
  }

  async getContractsList() {
    return this.contractRepository.find({ relations: ['employee'] });
  }

  async getPendingRequests() {
    return this.requestRepository.find({
      where: { status: 'PENDIENTE' },
      relations: ['employee'],
    });
  }

  async getUpcomingHolidays() {
    const today = new Date();
    return this.holidayRepository
      .createQueryBuilder('holiday')
      .where('holiday.date >= :today', {
        today: today.toISOString().slice(0, 10),
      })
      .orderBy('holiday.date', 'ASC')
      .getMany();
  }
}
