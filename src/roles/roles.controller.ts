import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { IdDTO, ResponseDTO } from './../base/dto/base.dto';
import { RolePaginationDto } from './dto/role.pagination.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('permissions')
  @ApiOperation({ summary: 'Get all permissions' })
  async permissions(): Promise<ResponseDTO> {
    const permissions = await this.rolesService.allPermissions();
    return { status: 'success', data: permissions };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get(':id')
  @ApiOperation({ summary: 'Get Role by ID' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO> {
    const role = await this.rolesService.getBy(id);
    return { status: 'success', data: role };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  async all(@Query() query: RolePaginationDto): Promise<ResponseDTO> {
    const roles = await this.rolesService.all({ query });
    return { status: 'success', data: roles };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Post()
  @ApiOperation({ summary: 'Create Role' })
  async create(@Body() body: RoleDto): Promise<ResponseDTO> {
    const role = await this.rolesService.create({ body });
    return { status: 'success', data: role };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Patch(':id')
  @ApiOperation({ summary: 'Update Role' })
  async update(
    @Param() params: IdDTO,
    @Body() body: RoleDto,
  ): Promise<ResponseDTO> {
    const updatedRole = await this.rolesService.update({
      id: params.id,
      body,
    });
    return { status: 'success', data: updatedRole };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Role' })
  async delete(@Param() params: IdDTO): Promise<ResponseDTO> {
    const result = await this.rolesService.delete({ id: params.id });
    return { status: 'success', data: result };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
}
