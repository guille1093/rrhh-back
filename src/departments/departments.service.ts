import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Area } from '@/areas/entities/area.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const area = await this.areaRepository.findOneBy({
      id: createDepartmentDto.areaId,
    });
    if (!area) throw new NotFoundException('Area not found');
    const department = this.departmentRepository.create({
      ...createDepartmentDto,
      area,
    });
    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['area'] });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['area'],
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findOne(id);
    if (updateDepartmentDto.areaId) {
      const area = await this.areaRepository.findOneBy({
        id: updateDepartmentDto.areaId,
      });
      if (!area) throw new NotFoundException('Area not found');
      department.area = area;
    }
    Object.assign(department, updateDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
