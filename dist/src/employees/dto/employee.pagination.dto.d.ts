import { PaginationRequestDTO } from '../../base/dto/base.dto';
export declare class EmployeeFilterDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyId?: number;
    departmentId?: number;
    positionId?: number;
}
declare const EmployeePaginationDto_base: import("@nestjs/common").Type<PaginationRequestDTO & EmployeeFilterDto>;
export declare class EmployeePaginationDto extends EmployeePaginationDto_base {
}
export {};
