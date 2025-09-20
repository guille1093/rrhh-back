import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Employee } from '@/employees/entities/employee.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const employee = await this.employeeRepository.findOneBy({
      id: createEvaluationDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const evaluation = this.evaluationRepository.create({
      ...createEvaluationDto,
      employee,
    });
    return this.evaluationRepository.save(evaluation);
  }

  async findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!evaluation) throw new NotFoundException('Evaluation not found');
    return evaluation;
  }

  async update(
    id: number,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    const evaluation = await this.findOne(id);
    if (updateEvaluationDto.employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: updateEvaluationDto.employeeId,
      });
      if (!employee) throw new NotFoundException('Employee not found');
      evaluation.employee = employee;
    }
    Object.assign(evaluation, updateEvaluationDto);
    return this.evaluationRepository.save(evaluation);
  }

  async remove(id: number): Promise<void> {
    await this.evaluationRepository.delete(id);
  }
}
