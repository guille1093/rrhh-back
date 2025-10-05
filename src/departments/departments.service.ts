import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Area } from '../areas/entities/area.entity';
import { User } from '../users/entities/user.entity';
import { DepartmentPaginationDto } from './dto/department.pagination.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
    user: User,
  ): Promise<Department> {
    const area = await this.areaRepository.findOneBy({
      id: createDepartmentDto.areaId,
    });
    if (!area) throw new NotFoundException('Area not found');
    const department = this.departmentRepository.create({
      ...createDepartmentDto,
      area,
      createdBy: user,
    });
    return this.departmentRepository.save(department);
  }

  async findAll(
    query: DepartmentPaginationDto,
  ): Promise<PaginationResponseDTO> {
    const qb = this.departmentRepository
      .createQueryBuilder('department')
      .where('department.deletedAt IS NULL')
      .leftJoinAndSelect('department.area', 'area')
      .leftJoinAndSelect('department.createdBy', 'createdBy')
      .leftJoinAndSelect('department.updatedBy', 'updatedBy');

    if (query.name) {
      qb.andWhere('department.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.areaId) {
      qb.andWhere('department.area_id = :areaId', { areaId: query.areaId });
    }

    const pageSize = query.pageSize ?? 10;
    const offset = query.offset ?? 0;
    qb.skip(offset).take(pageSize);

    if (query.orderBy) {
      qb.orderBy(`department.${query.orderBy}`, query.orderType ?? 'ASC');
    }

    const [results, total] = await qb.getManyAndCount();
    return {
      total,
      pageSize,
      offset,
      results,
    };
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['area', 'createdBy', 'updatedBy'],
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
    user: User,
  ): Promise<Department> {
    const department = await this.findOne(id);
    if (updateDepartmentDto.areaId) {
      const area = await this.areaRepository.findOneBy({
        id: updateDepartmentDto.areaId,
      });
      if (!area) throw new NotFoundException('Area not found');
      department.area = area;
    }
    this.departmentRepository.merge(department, updateDepartmentDto);
    department.updatedBy = user;
    return this.departmentRepository.save(department);
  }

  async remove(id: number, user: User): Promise<void> {
    const department = await this.findOne(id);
    department.updatedBy = user;
    await this.departmentRepository.save(department);
    await this.departmentRepository.softDelete(id);
  }
}
