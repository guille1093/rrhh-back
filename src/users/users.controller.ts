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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdDTO, ResponseDTO } from '../base/dto/base.dto';
import { BaseController } from '../base/base.controller';
import { UserDto } from './dto/user.dto';
import { UserPaginationDto } from './dto/user.pagination.dto';
import { Auth } from './../auth/auth.decorator';
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
  async all(@Query() query: UserPaginationDto): Promise<ResponseDTO> {
    const users = await this.userService.all({ query });
    return { status: 'success', data: users };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  @Get('whoami')
  @ApiOperation({ summary: 'Get User by ID' })
  async whoami(@Req() request: { user: User }): Promise<ResponseDTO> {
    return {
      status: 'success',
      data: request.user,
    };
  }
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  @Get(':id')
  @Auth('read:users')
  @ApiOperation({ summary: 'Get User by ID' })
  async getById(
    @Req() request: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDTO> {
    const userDto = new UserDto();
    userDto.id = id;
    const user = await this.userService.getBy(userDto);
    return { status: 'success', data: user };
  }
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  @Post()
  @Auth('create:users')
  @ApiOperation({ summary: 'Create User' })
  @Post()
  async create(@Body() body: UserDto): Promise<ResponseDTO> {
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
  ): Promise<ResponseDTO> {
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
  async delete(@Param() params: IdDTO): Promise<ResponseDTO> {
    const result = await this.userService.delete({ id: params.id });
    return { status: 'success', data: result };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
}
