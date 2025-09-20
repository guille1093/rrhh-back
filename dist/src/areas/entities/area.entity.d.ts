import { Company } from '../../companies/entities/company.entity';
import { Department } from '../../departments/entities/department.entity';
export declare class Area {
    id: number;
    name: string;
    company: Company;
    departments: Department[];
}
