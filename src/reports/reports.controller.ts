import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController extends BaseController {
  @Inject(ReportsService)
  private readonly reportsService: ReportsService;

  constructor() {
    super(ReportsController);
  }

  @Get('employees-count')
  @Auth('read:reports-employees-count')
  @ApiOperation({ summary: 'Get employees count' })
  async getEmployeesCount() {
    return {
      status: 'success',
      data: await this.reportsService.getEmployeesCount(),
    };
  }

  @Get('employees-by-structure')
  @Auth('read:reports-employees-by-structure')
  @ApiOperation({ summary: 'Get employees by structure' })
  async getEmployeesByStructure() {
    return {
      status: 'success',
      data: await this.reportsService.getEmployeesByStructure(),
    };
  }

  @Get('contracts-types')
  @Auth('read:reports-contracts-types')
  @ApiOperation({ summary: 'Get contracts types' })
  async getContractsTypes() {
    return {
      status: 'success',
      data: await this.reportsService.getContractsTypes(),
    };
  }

  @Get('contracts-list')
  @Auth('read:reports-contracts-list')
  @ApiOperation({ summary: 'Get contracts list' })
  async getContractsList() {
    return {
      status: 'success',
      data: await this.reportsService.getContractsList(),
    };
  }

  @Get('pending-requests')
  @Auth('read:reports-pending-requests')
  @ApiOperation({ summary: 'Get pending requests' })
  async getPendingRequests() {
    return {
      status: 'success',
      data: await this.reportsService.getPendingRequests(),
    };
  }

  @Get('upcoming-holidays')
  @Auth('read:reports-upcoming-holidays')
  @ApiOperation({ summary: 'Get upcoming holidays' })
  async getUpcomingHolidays() {
    return {
      status: 'success',
      data: await this.reportsService.getUpcomingHolidays(),
    };
  }
}
