import { BaseController } from '@/base/base.controller';
export declare class ReportsController extends BaseController {
    private readonly reportsService;
    constructor();
    getEmployeesCount(): Promise<{
        status: string;
        data: {
            total: number;
            withIncidence: number;
        };
    }>;
    getEmployeesByStructure(): Promise<{
        status: string;
        data: any[];
    }>;
    getContractsTypes(): Promise<{
        status: string;
        data: any[];
    }>;
    getContractsList(): Promise<{
        status: string;
        data: import("../employees/entities/contract.entity").Contract[];
    }>;
    getPendingRequests(): Promise<{
        status: string;
        data: import("../requests/entities/request.entity").Request[];
    }>;
    getUpcomingHolidays(): Promise<{
        status: string;
        data: import("../holidays/entities/holiday.entity").Holiday[];
    }>;
}
