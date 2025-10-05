import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { IdDTO, ResponseDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';
import { DepartmentPaginationDto } from './dto/department.pagination.dto';
import { User } from '../users/entities/user.entity';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController extends BaseController {
  @Inject(DepartmentsService)
  private readonly departmentsService: DepartmentsService;

  constructor() {
    super(DepartmentsController);
  }

  @Post()
  @Auth('create:departments')
  @ApiOperation({ summary: 'Create Department' })
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const department = await this.departmentsService.create(
      createDepartmentDto,
      request.user,
    );
    return { status: 'success', data: department };
  }

  @Get()
  @Auth('read:departments')
  @ApiOperation({ summary: 'Get all departments' })
  async findAll(@Query() query: DepartmentPaginationDto): Promise<ResponseDTO> {
    const departments = await this.departmentsService.findAll(query);
    return { status: 'success', data: departments };
  }

  @Get(':id')
  @Auth('read:departments')
  @ApiOperation({ summary: 'Get Department by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const department = await this.departmentsService.findOne(id);
    return { status: 'success', data: department };
  }

  @Patch(':id')
  @Auth('update:departments')
  @ApiOperation({ summary: 'Update Department' })
  async update(
    @Param() params: IdDTO,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const department = await this.departmentsService.update(
      Number(params.id),
      updateDepartmentDto,
      request.user,
    );
    return { status: 'success', data: department };
  }

  @Delete(':id')
  @Auth('delete:departments')
  @ApiOperation({ summary: 'Delete Department' })
  async remove(
    @Param() params: IdDTO,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    await this.departmentsService.remove(Number(params.id), request.user);
    return { status: 'success', data: null };
  }
}
