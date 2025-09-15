import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Auth } from '@/auth/auth.decorator';
import { BaseController } from '@/base/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { In } from 'typeorm';

@Controller('permissions')
@ApiTags('Permissions')
export class PermissionsController extends BaseController {
  @Inject(PermissionsService)
  private readonly permissionsService: PermissionsService;
  constructor() {
    super(PermissionsController);
  }

  @Get('/')
  findAll() {
    console.log('permissions.controller.ts -> findAll');
    return this.permissionsService.findAll();
  }
}
