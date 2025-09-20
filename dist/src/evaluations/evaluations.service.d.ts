import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Employee } from '@/employees/entities/employee.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
export declare class EvaluationsService {
    private readonly evaluationRepository;
    private readonly employeeRepository;
    constructor(evaluationRepository: Repository<Evaluation>, employeeRepository: Repository<Employee>);
    create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation>;
    findAll(): Promise<Evaluation[]>;
    findOne(id: number): Promise<Evaluation>;
    update(id: number, updateEvaluationDto: UpdateEvaluationDto): Promise<Evaluation>;
    remove(id: number): Promise<void>;
}
