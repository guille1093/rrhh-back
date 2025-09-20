import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Employee } from '@/employees/entities/employee.entity';
import { Department } from '@/departments/entities/department.entity';
import { Area } from '@/areas/entities/area.entity';
import { Position } from '@/positions/entities/position.entity';
import { Contract } from '@/employees/entities/contract.entity';
import { Request } from '@/requests/entities/request.entity';
import { Holiday } from '@/holidays/entities/holiday.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      Area,
      Position,
      Contract,
      Request,
      Holiday,
    ]),
    AuthModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
