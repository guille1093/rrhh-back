import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
export declare class StatesController {
    private readonly statesService;
    constructor(statesService: StatesService);
    create(createStateDto: CreateStateDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStateDto: UpdateStateDto): string;
    remove(id: string): string;
}
