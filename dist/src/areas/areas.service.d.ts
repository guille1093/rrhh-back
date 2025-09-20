import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Company } from '@/companies/entities/company.entity';
export declare class AreasService {
    private readonly areaRepository;
    private readonly companyRepository;
    constructor(areaRepository: Repository<Area>, companyRepository: Repository<Company>);
    create(createAreaDto: CreateAreaDto): Promise<Area>;
    findAll(): Promise<Area[]>;
    findOne(id: number): Promise<Area>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area>;
    remove(id: number): Promise<void>;
}
