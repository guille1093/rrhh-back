import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(createCityDto: CreateCityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCityDto: UpdateCityDto): string;
    remove(id: string): string;
}
