import { State } from '@/states/entities/state.entity';
import { Client } from '@/clients/entities/client.entity';
export declare class City {
    id: number;
    state: State;
    name: string;
    zip_code: string;
    clients: Client[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
