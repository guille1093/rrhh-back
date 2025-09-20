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
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
import { Auth } from '@/auth/auth.decorator';

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
  async create(@Body() createAreaDto: CreateAreaDto): Promise<ResposeDTO> {
    const area = await this.areasService.create(createAreaDto);
    return { status: 'success', data: area };
  }

  @Get()
  @Auth('read:areas')
  @ApiOperation({ summary: 'Get all areas' })
  async findAll(): Promise<ResposeDTO> {
    const areas = await this.areasService.findAll();
    return { status: 'success', data: areas };
  }

  @Get(':id')
  @Auth('read:areas')
  @ApiOperation({ summary: 'Get Area by ID' })
  async findOne(@Param('id') id: number): Promise<ResposeDTO> {
    const area = await this.areasService.findOne(Number(id));
    return { status: 'success', data: area };
  }

  @Patch(':id')
  @Auth('update:areas')
  @ApiOperation({ summary: 'Update Area' })
  async update(
    @Param() params: IdDTO,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<ResposeDTO> {
    const area = await this.areasService.update(
      Number(params.id),
      updateAreaDto,
    );
    return { status: 'success', data: area };
  }

  @Delete(':id')
  @Auth('delete:areas')
  @ApiOperation({ summary: 'Delete Area' })
  async remove(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.areasService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
