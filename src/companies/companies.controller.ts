import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IdDTO, ResposeDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController extends BaseController {
  @Inject(CompaniesService)
  private readonly companiesService: CompaniesService;

  constructor() {
    super(CompaniesController);
  }

  @Post()
  @Auth('create:companies')
  @ApiOperation({ summary: 'Create Company' })
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<ResposeDTO> {
    const company = await this.companiesService.create(createCompanyDto);
    return { status: 'success', data: company };
  }

  @Get()
  @Auth('read:companies')
  @ApiOperation({ summary: 'Get all companies' })
  async findAll(): Promise<ResposeDTO> {
    const companies = await this.companiesService.findAll();
    return { status: 'success', data: companies };
  }

  @Get(':id')
  @Auth('read:companies')
  @ApiOperation({ summary: 'Get Company by ID' })
  async findOne(@Param('id') id: number): Promise<ResposeDTO> {
    const company = await this.companiesService.findOne(Number(id));
    return { status: 'success', data: company };
  }

  @Patch(':id')
  @Auth('update:companies')
  @ApiOperation({ summary: 'Update Company' })
  async update(
    @Param() params: IdDTO,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<ResposeDTO> {
    const company = await this.companiesService.update(
      Number(params.id),
      updateCompanyDto,
    );
    return { status: 'success', data: company };
  }

  @Delete(':id')
  @Auth('delete:companies')
  @ApiOperation({ summary: 'Delete Company' })
  async remove(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.companiesService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
