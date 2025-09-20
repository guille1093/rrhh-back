import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Department } from '../departments/entities/department.entity';
export declare class PositionsService {
    private readonly positionRepository;
    private readonly departmentRepository;
    constructor(positionRepository: Repository<Position>, departmentRepository: Repository<Department>);
    create(createPositionDto: CreatePositionDto): Promise<Position>;
    findAll(): Promise<Position[]>;
    findOne(id: number): Promise<Position>;
    update(id: number, updatePositionDto: UpdatePositionDto): Promise<Position>;
    remove(id: number): Promise<void>;
}
