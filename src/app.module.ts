import { Holiday } from './holidays/entities/holiday.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './companies/companies.module';
import { ClientsModule } from './clients/clients.module';
import { AreasModule } from './areas/areas.module';
import { CitiesModule } from './cities/cities.module';
import { DepartmentsModule } from './departments/departments.module';
import { CountriesModule } from './countries/countries.module';
import { PositionsModule } from './positions/positions.module';
import { StatesModule } from './states/states.module';
import { EmployeesModule } from './employees/employees.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RequestsModule } from './requests/requests.module';
import { HealthModule } from './health/health.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { ReportsModule } from './reports/reports.module';
import { AlertsModule } from './alerts/alerts.module';
import { HolidaysModule } from './holidays/holidays.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    DatabaseModule,
    ClientsModule,
    CitiesModule,
    StatesModule,
    CountriesModule,
    PermissionsModule,
    CompaniesModule,
    AreasModule,
    DepartmentsModule,
    PositionsModule,
    EmployeesModule,
    RequestsModule,
    HolidaysModule,
    HealthModule,
    EvaluationsModule,
    ReportsModule,
    AlertsModule,
  ],
})
export class AppModule {}
