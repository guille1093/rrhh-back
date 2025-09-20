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
    const employee = await this.employeeRepository.findOneBy({
      id: createHealthDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const health = this.healthRepository.create({
      ...createHealthDto,
      employee,
    });
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
    if (!health) throw new NotFoundException('Health record not found');
    return health;
  }

  async update(id: number, updateHealthDto: UpdateHealthDto): Promise<Health> {
    const health = await this.findOne(id);
    if (updateHealthDto.employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: updateHealthDto.employeeId,
      });
      if (!employee) throw new NotFoundException('Employee not found');
      health.employee = employee;
    }
    Object.assign(health, updateHealthDto);
    return this.healthRepository.save(health);
  }

  async remove(id: number): Promise<void> {
    await this.healthRepository.delete(id);
  }
}
