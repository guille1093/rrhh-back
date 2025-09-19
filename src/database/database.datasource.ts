import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/roles/entities/role.entity';
import { Permission } from '@/permissions/entities/permission.entity';

config();
const configService = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User, Role, Permission],
  migrations: [__dirname + '/../../db-migration/*.{ts,js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
  logging: false,
  ssl: { rejectUnauthorized: false },
});
