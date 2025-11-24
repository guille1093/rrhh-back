import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Department } from '../departments/entities/department.entity';
import { User } from '../users/entities/user.entity';
import { PositionPaginationDto } from './dto/position.pagination.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(
    createPositionDto: CreatePositionDto,
    user: User,
  ): Promise<Position> {
    const department = await this.departmentRepository.findOneBy({
      id: createPositionDto.departmentId,
    });
    if (!department) throw new NotFoundException('Department not found');
    const position = this.positionRepository.create({
      ...createPositionDto,
      department,
      createdBy: user,
    });
    return this.positionRepository.save(position);
  }

  async findAll(query: PositionPaginationDto): Promise<PaginationResponseDTO> {
    const qb = this.positionRepository
      .createQueryBuilder('position')
      .where('position.deletedAt IS NULL')
      .leftJoinAndSelect('position.department', 'department')
      .leftJoinAndSelect('department.area', 'area')
      .leftJoinAndSelect('area.company', 'company')
      .leftJoinAndSelect('position.employees', 'employees')
      .leftJoinAndSelect('position.createdBy', 'createdBy')
      .leftJoinAndSelect('position.updatedBy', 'updatedBy');

    if (query.name) {
      qb.andWhere('position.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.departmentId) {
      qb.andWhere('position.department_id = :departmentId', {
        departmentId: query.departmentId,
      });
    }
    if (query.companyId) {
      qb.andWhere('company.id = :companyId', {
        companyId: query.companyId,
      });
    }
    if (query.areaId) {
      qb.andWhere('area.id = :areaId', {
        areaId: query.areaId,
      });
    }

    const pageSize = query.pageSize ?? 10;
    const offset = query.offset ?? 0;
    qb.skip(offset).take(pageSize);

    if (query.orderBy) {
      qb.orderBy(`position.${query.orderBy}`, query.orderType ?? 'ASC');
    }

    const [results, total] = await qb.getManyAndCount();
    return {
      total,
      pageSize,
      offset,
      results,
    };
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: [
        'department',
        'createdBy',
        'updatedBy',
        'department.area',
        'department.area.company',
        'employees',
      ],
    });
    if (!position) throw new NotFoundException('Position not found');
    return position;
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
    user: User,
  ): Promise<Position> {
    const position = await this.findOne(id);
    if (updatePositionDto.departmentId) {
      const department = await this.departmentRepository.findOneBy({
        id: updatePositionDto.departmentId,
      });
      if (!department) throw new NotFoundException('Department not found');
      position.department = department;
    }
    this.positionRepository.merge(position, updatePositionDto);
    position.updatedBy = user;
    return this.positionRepository.save(position);
  }

  async remove(id: number, user: User): Promise<void> {
    const position = await this.findOne(id);
    position.updatedBy = user;
    await this.positionRepository.save(position);
    await this.positionRepository.softDelete(id);
  }
}
