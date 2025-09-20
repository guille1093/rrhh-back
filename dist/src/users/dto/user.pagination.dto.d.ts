import { PaginationRequestDTO } from '@/base/dto/base.dto';
import { UserDto } from './user.dto';
declare const UserPaginationDto_base: import("@nestjs/common").Type<UserDto & PaginationRequestDTO>;
export declare class UserPaginationDto extends UserPaginationDto_base {
}
export {};
