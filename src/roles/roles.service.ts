import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePaginationDto } from './dto/role.pagination.dto';

@Injectable()
export class RolesService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async getBy(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['permissions'],
    });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return role;
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async all(params: {
    query: RolePaginationDto;
  }): Promise<PaginationResponseDTO> {
    const {
      offset = 0,
      pageSize = 10,
      orderBy = 'id',
      orderType = 'ASC',
    } = params.query;

    const [results, total] = await this.roleRepository.findAndCount({
      where: { deletedAt: IsNull() },
      relations: ['permissions'],
      skip: typeof offset === 'number' ? offset : 0,
      take: typeof pageSize === 'number' ? pageSize : 10,
      order: {
        ...(typeof orderBy === 'string' && typeof orderType === 'string'
          ? { [orderBy]: orderType }
          : {}),
      },
    });

    return {
      total,
      pageSize: typeof pageSize === 'number' ? pageSize : 10,
      offset: typeof offset === 'number' ? offset : 0,
      results,
    };
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async create(params: { body: RoleDto }): Promise<Role> {
    if (
      await this.roleRepository.findOneBy({
        role: params.body.role,
      })
    ) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }
    if (params.body.permissions && params.body.permissions.length > 0) {
      const permissions = await this.permissionRepository.find({
        where: { id: In(params.body.permissions) },
      });
      params.body.permissions = permissions;
    }
    await this.roleRepository.save(
      this.roleRepository.create({
        ...params.body,
        createdAt: new Date(),
      }),
    );
    const createdRole = await this.roleRepository.findOne({
      where: { role: params.body.role },
      relations: ['permissions'],
    });
    if (!createdRole) {
      throw new HttpException(
        'Role not found after creation',
        HttpStatus.NOT_FOUND,
      );
    }
    return createdRole;
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async update(params: { id: number; body: RoleDto }): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: params.id },
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    if (params.body.permissions && params.body.permissions.length > 0) {
      const permissions = await this.permissionRepository.find({
        where: { id: In(params.body.permissions) },
      });
      role.permissions = permissions;
    }
    this.roleRepository.merge(role, params.body);
    role.updatedAt = new Date();
    await this.roleRepository.save(role);
    const updatedRole = await this.roleRepository.findOne({
      where: { id: params.id },
      relations: ['permissions'],
    });
    if (!updatedRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return updatedRole;
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async delete(params: { id: number }): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: params.id },
      relations: ['users'],
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    if (role.users && role.users.length > 0) {
      throw new HttpException(
        'Role has associated users and cannot be deleted',
        HttpStatus.CONFLICT,
      );
    }
    const result = await this.roleRepository.softDelete(params.id);
    if (result.affected === 0) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const deletedRole = await this.roleRepository.findOne({
      where: { id: params.id },
      withDeleted: true,
    });
    if (!deletedRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return deletedRole;
  }
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  async allPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
}
