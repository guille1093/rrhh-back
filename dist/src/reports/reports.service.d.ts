import { Repository } from 'typeorm';
import { Employee } from '@/employees/entities/employee.entity';
import { Department } from '@/departments/entities/department.entity';
import { Area } from '@/areas/entities/area.entity';
import { Position } from '@/positions/entities/position.entity';
import { Contract } from '@/employees/entities/contract.entity';
import { Request } from '@/requests/entities/request.entity';
import { Holiday } from '@/holidays/entities/holiday.entity';
export declare class ReportsService {
    private readonly employeeRepository;
    private readonly departmentRepository;
    private readonly areaRepository;
    private readonly positionRepository;
    private readonly contractRepository;
    private readonly requestRepository;
    private readonly holidayRepository;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>, areaRepository: Repository<Area>, positionRepository: Repository<Position>, contractRepository: Repository<Contract>, requestRepository: Repository<Request>, holidayRepository: Repository<Holiday>);
    getEmployeesCount(): Promise<{
        total: number;
        withIncidence: number;
    }>;
    getEmployeesByStructure(): Promise<any[]>;
    getContractsTypes(): Promise<any[]>;
    getContractsList(): Promise<Contract[]>;
    getPendingRequests(): Promise<Request[]>;
    getUpcomingHolidays(): Promise<Holiday[]>;
}
