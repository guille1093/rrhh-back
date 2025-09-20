import { Employee } from '../../employees/entities/employee.entity';
export declare class Health {
    id: number;
    employee: Employee;
    type: string;
    date: Date;
    notes?: string;
}
