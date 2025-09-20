import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { Employee } from './entities/employee.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
export declare class ContractsService {
    private readonly contractRepository;
    private readonly employeeRepository;
    constructor(contractRepository: Repository<Contract>, employeeRepository: Repository<Employee>);
    create(createContractDto: CreateContractDto): Promise<Contract>;
    findAll(): Promise<Contract[]>;
    findOne(id: number): Promise<Contract>;
    update(id: number, updateContractDto: UpdateContractDto): Promise<Contract>;
    remove(id: number): Promise<void>;
}
