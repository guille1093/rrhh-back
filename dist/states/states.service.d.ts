import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
export declare class StatesService {
    create(createStateDto: CreateStateDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStateDto: UpdateStateDto): string;
    remove(id: number): string;
}
