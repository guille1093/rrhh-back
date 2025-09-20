import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const department = await this.departmentRepository.findOneBy({
      id: createPositionDto.departmentId,
    });
    if (!department) throw new NotFoundException('Department not found');
    const position = this.positionRepository.create({
      ...createPositionDto,
      department,
    });
    return this.positionRepository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return this.positionRepository.find({ relations: ['department'] });
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!position) throw new NotFoundException('Position not found');
    return position;
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    const position = await this.findOne(id);
    if (updatePositionDto.departmentId) {
      const department = await this.departmentRepository.findOneBy({
        id: updatePositionDto.departmentId,
      });
      if (!department) throw new NotFoundException('Department not found');
      position.department = department;
    }
    Object.assign(position, updatePositionDto);
    return this.positionRepository.save(position);
  }

  async remove(id: number): Promise<void> {
    await this.positionRepository.delete(id);
  }
}
