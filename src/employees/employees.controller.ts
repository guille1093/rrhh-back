import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeePaginationDto } from './dto/employee.pagination.dto';
import { IdDTO, ResposeDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';
export class EmployeesController extends BaseController {
  @Inject(EmployeesService)
  private readonly employeesService: EmployeesService;

  constructor() {
    super(EmployeesController);
  }

  @Post()
  @Auth('create:employees')
  @ApiOperation({ summary: 'Create Employee' })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<ResposeDTO> {
    const employee = await this.employeesService.create(createEmployeeDto);
    return { status: 'success', data: employee };
  }

  @Get()
  @Auth('read:employees')
  @ApiOperation({ summary: 'Get all employees (paginated, filterable)' })
  async findAll(@Query() query: EmployeePaginationDto): Promise<ResposeDTO> {
    const employees = await this.employeesService.findAll(query);
    return { status: 'success', data: employees };
  }

  @Patch(':id')
  @Auth('update:employees')
  @ApiOperation({ summary: 'Update Employee' })
  async update(
    @Param() params: IdDTO,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<ResposeDTO> {
    const employee = await this.employeesService.update(
      Number(params.id),
      updateEmployeeDto,
    );
    return { status: 'success', data: employee };
  }

  @Delete(':id')
  @Auth('delete:employees')
  @ApiOperation({ summary: 'Delete Employee' })
  async remove(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.employeesService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
