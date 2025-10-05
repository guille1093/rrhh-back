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
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { IdDTO, ResponseDTO } from './../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { Auth } from '../auth/auth.decorator';
import { PositionPaginationDto } from './dto/position.pagination.dto';
import { User } from '../users/entities/user.entity';

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
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const position = await this.positionsService.create(
      createPositionDto,
      request.user,
    );
    return { status: 'success', data: position };
  }

  @Get()
  @Auth('read:positions')
  @ApiOperation({ summary: 'Get all positions' })
  async findAll(@Query() query: PositionPaginationDto): Promise<ResponseDTO> {
    const positions = await this.positionsService.findAll(query);
    return { status: 'success', data: positions };
  }

  @Get(':id')
  @Auth('read:positions')
  @ApiOperation({ summary: 'Get Position by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const position = await this.positionsService.findOne(id);
    return { status: 'success', data: position };
  }

  @Patch(':id')
  @Auth('update:positions')
  @ApiOperation({ summary: 'Update Position' })
  async update(
    @Param() params: IdDTO,
    @Body() updatePositionDto: UpdatePositionDto,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    const position = await this.positionsService.update(
      Number(params.id),
      updatePositionDto,
      request.user,
    );
    return { status: 'success', data: position };
  }

  @Delete(':id')
  @Auth('delete:positions')
  @ApiOperation({ summary: 'Delete Position' })
  async remove(
    @Param() params: IdDTO,
    @Req() request: { user: User },
  ): Promise<ResponseDTO> {
    await this.positionsService.remove(Number(params.id), request.user);
    return { status: 'success', data: null };
  }
}
