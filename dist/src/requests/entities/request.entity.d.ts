import { Employee } from '@/employees/entities/employee.entity';
export type RequestStatus = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
export declare class Request {
    id: number;
    employee: Employee;
    type: string;
    description?: string;
    date: Date;
    status: RequestStatus;
}
