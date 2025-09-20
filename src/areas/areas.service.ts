import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Company } from '@/companies/entities/company.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const company = await this.companyRepository.findOneBy({
      id: createAreaDto.companyId,
    });
    if (!company) throw new NotFoundException('Company not found');
    const area = this.areaRepository.create({ ...createAreaDto, company });
    return this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find({ relations: ['company'] });
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!area) throw new NotFoundException('Area not found');
    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const area = await this.findOne(id);
    if (updateAreaDto.companyId) {
      const company = await this.companyRepository.findOneBy({
        id: updateAreaDto.companyId,
      });
      if (!company) throw new NotFoundException('Company not found');
      area.company = company;
    }
    Object.assign(area, updateAreaDto);
    return this.areaRepository.save(area);
  }

  async remove(id: number): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
