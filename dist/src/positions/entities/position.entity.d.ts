import { Department } from '@/departments/entities/department.entity';
import { Employee } from '@/employees/entities/employee.entity';
export declare class Position {
    id: number;
    name: string;
    department: Department;
    employees: Employee[];
}
