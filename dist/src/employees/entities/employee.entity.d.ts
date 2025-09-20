import { Contract } from './contract.entity';
import { Request } from '../../requests/entities/request.entity';
import { Health } from '../../health/entities/health.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { Department } from '../../departments/entities/department.entity';
import { Position } from '../../positions/entities/position.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: Department;
    position: Position;
    contracts: Contract[];
    requests: Request[];
    healthRecords: Health[];
    evaluations: Evaluation[];
}
