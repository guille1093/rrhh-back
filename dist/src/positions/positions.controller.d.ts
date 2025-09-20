import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
export declare class PositionsController extends BaseController {
    private readonly positionsService;
    constructor();
    create(createPositionDto: CreatePositionDto): Promise<ResposeDTO>;
    findAll(): Promise<ResposeDTO>;
    findOne(id: number): Promise<ResposeDTO>;
    update(params: IdDTO, updatePositionDto: UpdatePositionDto): Promise<ResposeDTO>;
    remove(params: IdDTO): Promise<ResposeDTO>;
}
