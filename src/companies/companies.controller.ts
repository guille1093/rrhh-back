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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IdDTO, ResponseDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';
import { CompanyPaginationDto } from './dto/company.pagination.dto';
import { User } from '../users/entities/user.entity';

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
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const company = await this.companiesService.create(
      createCompanyDto,
      request.user,
    );
    return { status: 'success', data: company };
  }

  @Get()
  @Auth('read:companies')
  @ApiOperation({ summary: 'Get all companies' })
  async findAll(@Query() query: CompanyPaginationDto): Promise<ResponseDTO> {
    const companies = await this.companiesService.findAll(query);
    return { status: 'success', data: companies };
  }

  @Get(':id')
  @Auth('read:companies')
  @ApiOperation({ summary: 'Get Company by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const company = await this.companiesService.findOne(id);
    return { status: 'success', data: company };
  }

  @Patch(':id')
  @Auth('update:companies')
  @ApiOperation({ summary: 'Update Company' })
  async update(
    @Param() params: IdDTO,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const company = await this.companiesService.update(
      Number(params.id),
      updateCompanyDto,
      request.user,
    );
    return { status: 'success', data: company };
  }

  @Delete(':id')
  @Auth('delete:companies')
  @ApiOperation({ summary: 'Delete Company' })
  async remove(
    @Param() params: IdDTO,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const result = await this.companiesService.remove(
      Number(params.id),
      request.user,
    );
    return { status: 'success', data: result };
  }
}
