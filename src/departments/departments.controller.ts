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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { IdDTO, ResposeDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';

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
  ): Promise<ResposeDTO> {
    const department =
      await this.departmentsService.create(createDepartmentDto);
    return { status: 'success', data: department };
  }

  @Get()
  @Auth('read:departments')
  @ApiOperation({ summary: 'Get all departments' })
  async findAll(): Promise<ResposeDTO> {
    const departments = await this.departmentsService.findAll();
    return { status: 'success', data: departments };
  }

  @Get(':id')
  @Auth('read:departments')
  @ApiOperation({ summary: 'Get Department by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResposeDTO> {
    const department = await this.departmentsService.findOne(id);
    return { status: 'success', data: department };
  }

  @Patch(':id')
  @Auth('update:departments')
  @ApiOperation({ summary: 'Update Department' })
  async update(
    @Param() params: IdDTO,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<ResposeDTO> {
    const department = await this.departmentsService.update(
      Number(params.id),
      updateDepartmentDto,
    );
    return { status: 'success', data: department };
  }

  @Delete(':id')
  @Auth('delete:departments')
  @ApiOperation({ summary: 'Delete Department' })
  async remove(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.departmentsService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
