import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { AreaPaginationDto } from './dto/area.pagination.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createAreaDto: CreateAreaDto, user: User): Promise<Area> {
    const company = await this.companyRepository.findOneBy({
      id: createAreaDto.companyId,
    });
    if (!company) throw new NotFoundException('Company not found');
    const area = this.areaRepository.create({
      ...createAreaDto,
      company,
      createdBy: user,
    });
    return this.areaRepository.save(area);
  }

  async findAll(query: AreaPaginationDto): Promise<PaginationResponseDTO> {
    const qb = this.areaRepository
      .createQueryBuilder('area')
      .where('area.deletedAt IS NULL')
      .leftJoinAndSelect('area.company', 'company')
      .leftJoinAndSelect('area.createdBy', 'createdBy')
      .leftJoinAndSelect('area.updatedBy', 'updatedBy');

    if (query.name) {
      qb.andWhere('area.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.companyId) {
      qb.andWhere('area.company_id = :companyId', {
        companyId: query.companyId,
      });
    }

    const pageSize = query.pageSize ?? 10;
    const offset = query.offset ?? 0;
    qb.skip(offset).take(pageSize);

    if (query.orderBy) {
      qb.orderBy(`area.${query.orderBy}`, query.orderType ?? 'ASC');
    }

    const [results, total] = await qb.getManyAndCount();
    return {
      total,
      pageSize,
      offset,
      results,
    };
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['company', 'createdBy', 'updatedBy'],
    });
    if (!area) throw new NotFoundException('Area not found');
    return area;
  }

  async update(
    id: number,
    updateAreaDto: UpdateAreaDto,
    user: User,
  ): Promise<Area> {
    const area = await this.findOne(id);
    if (updateAreaDto.companyId) {
      const company = await this.companyRepository.findOneBy({
        id: updateAreaDto.companyId,
      });
      if (!company) throw new NotFoundException('Company not found');
      area.company = company;
    }
    this.areaRepository.merge(area, updateAreaDto);
    area.updatedBy = user;
    return this.areaRepository.save(area);
  }

  async remove(id: number, user: User): Promise<void> {
    const area = await this.findOne(id);
    area.updatedBy = user;
    await this.areaRepository.save(area);
    await this.areaRepository.softDelete(id);
  }
}
