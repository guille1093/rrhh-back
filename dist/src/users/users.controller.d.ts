import { User } from './entities/user.entity';
import { IdDTO, ResposeDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { UserDto } from '../users/dto/user.dto';
import { UserPaginationDto } from './dto/user.pagination.dto';
export declare class UsersController extends BaseController {
    private readonly userService;
    private readonly jwtService;
    constructor();
    all(query: UserPaginationDto): Promise<ResposeDTO>;
    getById(request: {
        user: User;
    }, id: number): Promise<ResposeDTO>;
    whoami(request: {
        user: User;
    }): Promise<ResposeDTO>;
    create(body: UserDto): Promise<ResposeDTO>;
    update(params: IdDTO, body: UserDto): Promise<ResposeDTO>;
    delete(params: IdDTO): Promise<ResposeDTO>;
}
