import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeePaginationDto } from './dto/employee.pagination.dto';
import { IdDTO, ResponseDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';

@Controller('employees')
@ApiTags('Employees')
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
  ): Promise<ResponseDTO> {
    const employee = await this.employeesService.create(createEmployeeDto);
    return { status: 'success', data: employee };
  }

  @Get()
  @Auth('read:employees')
  @ApiOperation({ summary: 'Get all employees (paginated, filterable)' })
  async findAll(@Query() query: EmployeePaginationDto): Promise<ResponseDTO> {
    const employees = await this.employeesService.findAll(query);
    return { status: 'success', data: employees };
  }

  @Get(':id')
  @Auth('read:employees')
  @ApiOperation({ summary: 'Get Employee by ID' })
  async findOne(@Param() params: IdDTO): Promise<ResponseDTO> {
    const employee = await this.employeesService.findOne(Number(params.id));
    return { status: 'success', data: employee };
  }

  @Patch(':id')
  @Auth('update:employees')
  @ApiOperation({ summary: 'Update Employee' })
  async update(
    @Param() params: IdDTO,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<ResponseDTO> {
    const employee = await this.employeesService.update(
      Number(params.id),
      updateEmployeeDto,
    );
    return { status: 'success', data: employee };
  }

  @Delete(':id')
  @Auth('delete:employees')
  @ApiOperation({ summary: 'Delete Employee' })
  async remove(@Param() params: IdDTO): Promise<ResponseDTO> {
    const result = await this.employeesService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
