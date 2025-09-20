import { Area } from '../../areas/entities/area.entity';
export declare class Company {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    industry?: string;
    areas: Area[];
}
