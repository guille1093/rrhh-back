import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
export declare class EvaluationsController {
    private readonly evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(createEvaluationDto: CreateEvaluationDto): Promise<import("./entities/evaluation.entity").Evaluation>;
    findAll(): Promise<import("./entities/evaluation.entity").Evaluation[]>;
    findOne(id: string): Promise<import("./entities/evaluation.entity").Evaluation>;
    update(id: string, updateEvaluationDto: UpdateEvaluationDto): Promise<import("./entities/evaluation.entity").Evaluation>;
    remove(id: string): Promise<void>;
}
