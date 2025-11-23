import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyMember } from './entities/family-member.entity';
import { CreateFamilyMemberDto } from '../employees/dto/create-family-member.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class FamilyMembersService {
  constructor(
    @InjectRepository(FamilyMember)
    private readonly familyMemberRepository: Repository<FamilyMember>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createFamilyMemberDto: CreateFamilyMemberDto,
  ): Promise<FamilyMember> {
    const employee = await this.employeeRepository.findOneBy({
      id: createFamilyMemberDto.employeeId,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const familyMember = this.familyMemberRepository.create({
      ...createFamilyMemberDto,
      employee,
    });
    return this.familyMemberRepository.save(familyMember);
  }

  async findAll(): Promise<FamilyMember[]> {
    return this.familyMemberRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number): Promise<FamilyMember> {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!familyMember) throw new NotFoundException('Family member not found');
    return familyMember;
  }

  async remove(id: number): Promise<void> {
    await this.familyMemberRepository.delete(id);
  }
}
