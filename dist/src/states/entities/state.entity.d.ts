import { City } from '../../cities/entities/city.entity';
export declare class State {
    id: number;
    name: string;
    cities: City[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
