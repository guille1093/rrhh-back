import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { Employee } from './entities/employee.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const employee = await this.employeeRepository.findOneBy({
      id: createContractDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const contract = this.contractRepository.create({
      ...createContractDto,
      employee,
    });
    return this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    const contract = await this.findOne(id);
    if (updateContractDto.employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: updateContractDto.employeeId,
      });
      if (!employee) throw new NotFoundException('Employee not found');
      contract.employee = employee;
    }
    Object.assign(contract, updateContractDto);
    return this.contractRepository.save(contract);
  }

  async remove(id: number): Promise<void> {
    await this.contractRepository.delete(id);
  }
}
