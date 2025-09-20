import { Area } from '../../areas/entities/area.entity';
import { Position } from '../../positions/entities/position.entity';
import { Employee } from '../../employees/entities/employee.entity';
export declare class Department {
    id: number;
    name: string;
    area: Area;
    positions: Position[];
    employees: Employee[];
}
