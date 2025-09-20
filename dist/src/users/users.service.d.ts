import { UserDto } from '@/users/dto/user.dto';
import { User } from '@/users/entities/user.entity';
import { PaginationResponseDTO } from '@/base/dto/base.dto';
import { UserPaginationDto } from './dto/user.pagination.dto';
export declare class UsersService {
    private readonly userRepository;
    getBy(body: UserDto): Promise<User>;
    getByEmailWithPassword(email: string): Promise<User>;
    all(params: {
        query: UserPaginationDto;
    }): Promise<PaginationResponseDTO>;
    create(params: {
        body: UserDto;
    }): Promise<User>;
    update(params: {
        id: number;
        body: UserDto;
    }): Promise<User>;
    delete(params: {
        id: number;
    }): Promise<User>;
    private _hashPassword;
}
