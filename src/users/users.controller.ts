import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdDTO, ResposeDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { UserDto } from './dto/user.dto';
import { UserPaginationDto } from './dto/user.pagination.dto';
import { Auth } from '../auth/auth.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags('Users')
export class UsersController extends BaseController {
  @Inject(UsersService)
  private readonly userService: UsersService;
  private readonly jwtService: JwtService;

  constructor() {
    super(UsersController);
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get()
  //   @Auth('read:users')
  @Auth('read:users')
  @ApiOperation({ summary: 'Get all users' })
  async all(@Query() query: UserPaginationDto): Promise<ResposeDTO> {
    const users = await this.userService.all({ query });
    return { status: 'success', data: users };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get(':id')
  @Auth('read:users')
  @ApiOperation({ summary: 'Get User by ID' })
  async getById(
    @Req() request: { user: User },
    @Param('id') id: number,
  ): Promise<ResposeDTO> {
    const userDto = new UserDto();
    userDto.id = id;
    const user = await this.userService.getBy(userDto);
    return { status: 'success', data: user };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get('whoami')
  @ApiOperation({ summary: 'Get User by ID' })
  async whoami(@Req() request: { user: User }): Promise<ResposeDTO> {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return {
      status: 'success',
      data: request.user,
    };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Post()
  @Auth('create:users')
  @ApiOperation({ summary: 'Create User' })
  @Post()
  async create(@Body() body: UserDto): Promise<ResposeDTO> {
    const user = await this.userService.create({ body });
    return { status: 'success', data: user };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Patch(':id')
  @Auth('update:users')
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Param() params: IdDTO,
    @Body() body: UserDto,
  ): Promise<ResposeDTO> {
    return {
      status: 'success',
      data: await this.userService.update({ id: params.id, body }),
    };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Delete(':id')
  @Auth('delete:users')
  @ApiOperation({ summary: 'Delete User' })
  async delete(@Param() params: IdDTO): Promise<ResposeDTO> {
    const result = await this.userService.delete({ id: params.id });
    return { status: 'success', data: result };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
}
