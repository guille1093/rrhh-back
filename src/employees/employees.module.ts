import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { FamilyMember } from './entities/family-member.entity';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { ContractsModule } from './contracts.module';
import { FamilyMembersModule } from './family-members.module';
import { EmergencyContactsModule } from './emergency-contacts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      Position,
      FamilyMember,
      EmergencyContact,
    ]),
    ContractsModule,
    FamilyMembersModule,
    EmergencyContactsModule,
    AuthModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
