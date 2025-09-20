import { AlertsGateway } from '../alerts/alerts.gateway';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { Employee } from '@/employees/entities/employee.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
export declare class RequestsService {
    private readonly requestRepository;
    private readonly employeeRepository;
    private readonly alertsGateway;
    constructor(requestRepository: Repository<Request>, employeeRepository: Repository<Employee>, alertsGateway: AlertsGateway);
    create(createRequestDto: CreateRequestDto): Promise<Request>;
    findAll(): Promise<Request[]>;
    findOne(id: number): Promise<Request>;
    update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request>;
    remove(id: number): Promise<void>;
}
