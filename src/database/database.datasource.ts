import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Company } from '../companies/entities/company.entity';
import { Area } from '../areas/entities/area.entity';
import { Department } from '../departments/entities/department.entity';
import { Position } from '../positions/entities/position.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Contract } from '../employees/entities/contract.entity';
import { Request } from '../requests/entities/request.entity';
import { Holiday } from '../holidays/entities/holiday.entity';
import { Health } from '../health/entities/health.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { Client } from '../clients/entities/client.entity';
import { State } from '../states/entities/state.entity';
import { City } from '../cities/entities/city.entity';
import { Country } from '../countries/entities/country.entity';
import { EmergencyContact } from '../employees/entities/emergency-contact.entity';
import { FamilyMember } from '../employees/entities/family-member.entity';

config();
const configService = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [
    User,
    Role,
    Permission,
    Company,
    Area,
    Department,
    Position,
    Employee,
    Contract,
    Request,
    Holiday,
    Health,
    Evaluation,
    Client,
    State,
    City,
    Country,
    EmergencyContact,
    FamilyMember,
  ],
  migrations: [__dirname + '/../../db-migration/*.{ts,js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
  logging: false,
  ssl: { rejectUnauthorized: false },
});
