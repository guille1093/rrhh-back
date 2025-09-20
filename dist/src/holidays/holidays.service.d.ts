import { Repository } from 'typeorm';
import { Holiday } from './entities/holiday.entity';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
export declare class HolidaysService {
    private readonly holidayRepository;
    constructor(holidayRepository: Repository<Holiday>);
    create(createHolidayDto: CreateHolidayDto): Promise<Holiday>;
    findAll(): Promise<Holiday[]>;
    findOne(id: number): Promise<Holiday>;
    update(id: number, updateHolidayDto: UpdateHolidayDto): Promise<Holiday>;
    remove(id: number): Promise<void>;
}
