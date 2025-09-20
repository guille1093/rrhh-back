import { Employee } from './employee.entity';
export declare class Contract {
    id: number;
    employee: Employee;
    contractType: string;
    startDate: Date;
    endDate?: Date;
    workSchedule?: string;
    salary?: number;
    compensation?: string;
}
