import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmergencyContactsService {
  constructor(
    @InjectRepository(EmergencyContact)
    private readonly emergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createEmergencyContactDto: CreateEmergencyContactDto,
  ): Promise<EmergencyContact> {
    const employee = await this.employeeRepository.findOneBy({
      id: createEmergencyContactDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');

    const emergencyContact = this.emergencyContactRepository.create({
      ...createEmergencyContactDto,
      employee,
    });

    return this.emergencyContactRepository.save(emergencyContact);
  }

  async findAll(): Promise<EmergencyContact[]> {
    return this.emergencyContactRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<EmergencyContact> {
    const emergencyContact = await this.emergencyContactRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!emergencyContact)
      throw new NotFoundException('Emergency contact not found');

    return emergencyContact;
  }

  async remove(id: number): Promise<void> {
    await this.emergencyContactRepository.delete(id);
  }
}
