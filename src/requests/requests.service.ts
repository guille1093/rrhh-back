import { Injectable, NotFoundException } from '@nestjs/common';
import { AlertsGateway } from '../alerts/alerts.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly alertsGateway: AlertsGateway,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const employee = await this.employeeRepository.findOneBy({
      id: createRequestDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const request = this.requestRepository.create({
      ...createRequestDto,
      employee,
    });
    const savedRequest = await this.requestRepository.save(request);
    // Emitir alerta por WebSocket
    this.alertsGateway.emitNewRequestAlert({
      id: savedRequest.id,
      employee: {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
      },
      type: savedRequest.type,
      date: savedRequest.date,
      status: savedRequest.status,
    });
    return savedRequest;
  }

  async findAll(): Promise<Request[]> {
    return this.requestRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!request) throw new NotFoundException('Request not found');
    return request;
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const request = await this.findOne(id);
    if (updateRequestDto.employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: updateRequestDto.employeeId,
      });
      if (!employee) throw new NotFoundException('Employee not found');
      request.employee = employee;
    }
    Object.assign(request, updateRequestDto);
    return this.requestRepository.save(request);
  }

  async remove(id: number): Promise<void> {
    await this.requestRepository.delete(id);
  }
}
