import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { AuthModule } from '../auth/auth.module';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { ContractsModule } from './contracts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Department, Position]),
    ContractsModule,
    AuthModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
