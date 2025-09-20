import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
export declare class AreasController extends BaseController {
    private readonly areasService;
    constructor();
    create(createAreaDto: CreateAreaDto): Promise<ResposeDTO>;
    findAll(): Promise<ResposeDTO>;
    findOne(id: number): Promise<ResposeDTO>;
    update(params: IdDTO, updateAreaDto: UpdateAreaDto): Promise<ResposeDTO>;
    remove(params: IdDTO): Promise<ResposeDTO>;
}
