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
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { IdDTO, ResponseDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';
import { AreaPaginationDto } from './dto/area.pagination.dto';
import { User } from '../users/entities/user.entity';

@Controller('areas')
@ApiTags('Areas')
export class AreasController extends BaseController {
  @Inject(AreasService)
  private readonly areasService: AreasService;

  constructor() {
    super(AreasController);
  }

  @Post()
  @Auth('create:areas')
  @ApiOperation({ summary: 'Create Area' })
  async create(
    @Body() createAreaDto: CreateAreaDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const area = await this.areasService.create(createAreaDto, request.user);
    return { status: 'success', data: area };
  }

  @Get()
  @Auth('read:areas')
  @ApiOperation({ summary: 'Get all areas' })
  async findAll(@Query() query: AreaPaginationDto): Promise<ResponseDTO> {
    const areas = await this.areasService.findAll(query);
    return { status: 'success', data: areas };
  }

  @Get(':id')
  @Auth('read:areas')
  @ApiOperation({ summary: 'Get Area by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const area = await this.areasService.findOne(id);
    return { status: 'success', data: area };
  }

  @Patch(':id')
  @Auth('update:areas')
  @ApiOperation({ summary: 'Update Area' })
  async update(
    @Param() params: IdDTO,
    @Body() updateAreaDto: UpdateAreaDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const area = await this.areasService.update(
      Number(params.id),
      updateAreaDto,
      request.user,
    );
    return { status: 'success', data: area };
  }

  @Delete(':id')
  @Auth('delete:areas')
  @ApiOperation({ summary: 'Delete Area' })
  async remove(
    @Param() params: IdDTO,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    await this.areasService.remove(Number(params.id), request.user);
    return { status: 'success', data: null };
  }
}
