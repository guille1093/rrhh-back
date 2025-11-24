import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './entities/health.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private readonly healthRepository: Repository<Health>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createHealthDto: CreateHealthDto): Promise<Health> {
    const { employeeId, realizationDate, expirationDate, ...rest } =
      createHealthDto;

    const employee = await this.employeeRepository.findOneBy({
      id: employeeId,
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const health = this.healthRepository.create({
      ...rest,
      employee,
      realizationDate: new Date(realizationDate),
    });

    if (expirationDate) {
      health.expirationDate = new Date(expirationDate);
    }

    return this.healthRepository.save(health);
  }

  async findAll(): Promise<Health[]> {
    return this.healthRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Health> {
    const health = await this.healthRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!health) {
      throw new NotFoundException(`Health record with ID ${id} not found`);
    }
    return health;
  }

  async update(id: number, updateHealthDto: UpdateHealthDto): Promise<Health> {
    const { employeeId, realizationDate, expirationDate, ...rest } =
      updateHealthDto;
    const health = await this.findOne(id);

    if (employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: employeeId,
      });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
      }
      health.employee = employee;
    }

    // Assign non-date properties
    Object.assign(health, rest);

    // Handle date properties separately
    if (realizationDate) {
      health.realizationDate = new Date(realizationDate);
    }
    if (updateHealthDto.hasOwnProperty('expirationDate')) {
      health.expirationDate = expirationDate ? new Date(expirationDate) : null;
    }

    return this.healthRepository.save(health);
  }

  async remove(id: number): Promise<void> {
    const result = await this.healthRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Health record with ID ${id} not found`);
    }
  }
}
