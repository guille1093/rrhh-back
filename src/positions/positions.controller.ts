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
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { IdDTO, ResposeDTO } from '@/base/dto/base.dto';
import { BaseController } from '@/base/base.controller';
import { Auth } from '@/auth/auth.decorator';

@Controller('positions')
@ApiTags('Positions')
export class PositionsController extends BaseController {
  @Inject(PositionsService)
  private readonly positionsService: PositionsService;

  constructor() {
    super(PositionsController);
  }

  @Post()
  @Auth('create:positions')
  @ApiOperation({ summary: 'Create Position' })
  async create(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<ResposeDTO> {
    const position = await this.positionsService.create(createPositionDto);
    return { status: 'success', data: position };
  }

  @Get()
  @Auth('read:positions')
  @ApiOperation({ summary: 'Get all positions' })
  async findAll(): Promise<ResposeDTO> {
    const positions = await this.positionsService.findAll();
    return { status: 'success', data: positions };
  }

  @Get(':id')
  @Auth('read:positions')
  @ApiOperation({ summary: 'Get Position by ID' })
  async findOne(@Param('id') id: number): Promise<ResposeDTO> {
    const position = await this.positionsService.findOne(Number(id));
    return { status: 'success', data: position };
  }

  @Patch(':id')
  @Auth('update:positions')
  @ApiOperation({ summary: 'Update Position' })
  async update(
    @Param() params: IdDTO,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<ResposeDTO> {
    const position = await this.positionsService.update(
      Number(params.id),
      updatePositionDto,
    );
    return { status: 'success', data: position };
  }

  @Delete(':id')
  @Auth('delete:positions')
  @ApiOperation({ summary: 'Delete Position' })
  async remove(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.positionsService.remove(Number(params.id));
    return { status: 'success', data: result };
  }
}
