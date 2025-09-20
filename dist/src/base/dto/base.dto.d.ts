export declare class PaginationRequestDTO {
    offset?: number;
    pageSize?: number;
    orderBy?: string;
    orderType?: 'ASC' | 'DESC';
}
export declare class PaginationResponseDTO {
    total: number;
    pageSize: number;
    offset: number;
    results: any[];
}
export declare class ResposeDTO {
    status: 'success' | 'error';
    data?: any;
}
export declare class IdDTO {
    id: number;
}
export declare class RoleDto {
    offset?: number;
    limit?: number;
    orderBy?: string;
    orderType?: 'ASC' | 'DESC';
}
