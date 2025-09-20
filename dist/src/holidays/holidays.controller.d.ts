import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
export declare class HolidaysController {
    private readonly holidaysService;
    constructor(holidaysService: HolidaysService);
    create(createHolidayDto: CreateHolidayDto): Promise<import("./entities/holiday.entity").Holiday>;
    findAll(): Promise<import("./entities/holiday.entity").Holiday[]>;
    findOne(id: string): Promise<import("./entities/holiday.entity").Holiday>;
    update(id: string, updateHolidayDto: UpdateHolidayDto): Promise<import("./entities/holiday.entity").Holiday>;
    remove(id: string): Promise<void>;
}
