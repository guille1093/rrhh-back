import { Repository } from 'typeorm';
import { Health } from './entities/health.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
export declare class HealthService {
    private readonly healthRepository;
    private readonly employeeRepository;
    constructor(healthRepository: Repository<Health>, employeeRepository: Repository<Employee>);
    create(createHealthDto: CreateHealthDto): Promise<Health>;
    findAll(): Promise<Health[]>;
    findOne(id: number): Promise<Health>;
    update(id: number, updateHealthDto: UpdateHealthDto): Promise<Health>;
    remove(id: number): Promise<void>;
}
