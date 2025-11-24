import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyPaginationDto } from './dto/company.pagination.dto';
import { PaginationResponseDTO } from '../base/dto/base.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    const company = this.companyRepository.create({
      ...createCompanyDto,
      createdBy: user,
    });
    return this.companyRepository.save(company);
  }

  async findAll(query: CompanyPaginationDto): Promise<PaginationResponseDTO> {
    const qb = this.companyRepository
      .createQueryBuilder('company')
      .where('company.deletedAt IS NULL')
      .leftJoinAndSelect('company.areas', 'areas')
      .leftJoinAndSelect('areas.departments', 'departments')
      .leftJoinAndSelect('departments.positions', 'positions')
      .leftJoinAndSelect('positions.employees', 'employees')
      .leftJoinAndSelect('company.createdBy', 'createdBy')
      .leftJoinAndSelect('company.updatedBy', 'updatedBy');

    if (query.name) {
      qb.andWhere('company.name ILIKE :name', { name: `%${query.name}%` });
    }
    if (query.industry) {
      qb.andWhere('company.industry ILIKE :industry', {
        industry: `%${query.industry}%`,
      });
    }

    const pageSize = query.pageSize ?? 10;
    const offset = query.offset ?? 0;
    qb.skip(offset).take(pageSize);

    if (query.orderBy) {
      qb.orderBy(`company.${query.orderBy}`, query.orderType ?? 'ASC');
    }

    const [results, total] = await qb.getManyAndCount();
    return {
      total,
      pageSize,
      offset,
      results,
    };
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: [
        'areas',
        'areas.departments',
        'areas.departments.positions.employees',
        'createdBy',
        'updatedBy',
      ],
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    user: User,
  ): Promise<Company> {
    const company = await this.findOne(id);
    this.companyRepository.merge(company, updateCompanyDto);
    company.updatedBy = user;
    await this.companyRepository.save(company);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const company = await this.findOne(id);
    company.updatedBy = user;
    await this.companyRepository.save(company);
    await this.companyRepository.softDelete(id);
  }
}
