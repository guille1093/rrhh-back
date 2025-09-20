import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    create(createHealthDto: CreateHealthDto): Promise<import("./entities/health.entity").Health>;
    findAll(): Promise<import("./entities/health.entity").Health[]>;
    findOne(id: string): Promise<import("./entities/health.entity").Health>;
    update(id: string, updateHealthDto: UpdateHealthDto): Promise<import("./entities/health.entity").Health>;
    remove(id: string): Promise<void>;
}
