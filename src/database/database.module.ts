import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [
            __dirname + '/../users/entities/user.entity{.ts,.js}',
            __dirname + '/../roles/entities/role.entity{.ts,.js}',
            __dirname + '/../permissions/entities/permission.entity{.ts,.js}',
            __dirname + '/../companies/entities/company.entity{.ts,.js}',
            __dirname + '/../areas/entities/area.entity{.ts,.js}',
            __dirname + '/../departments/entities/department.entity{.ts,.js}',
            __dirname + '/../positions/entities/position.entity{.ts,.js}',
            __dirname + '/../employees/entities/employee.entity{.ts,.js}',
            __dirname + '/../employees/entities/contract.entity{.ts,.js}',
            __dirname + '/../employees/entities/family-member.entity{.ts,.js}',
            __dirname +
              '/../employees/entities/emergency-contact.entity{.ts,.js}',
            __dirname + '/../requests/entities/request.entity{.ts,.js}',
            __dirname + '/../holidays/entities/holiday.entity{.ts,.js}',
            __dirname + '/../health/entities/health.entity{.ts,.js}',
            __dirname + '/../evaluations/entities/evaluation.entity{.ts,.js}',
            __dirname + '/../clients/entities/client.entity{.ts,.js}',
            __dirname + '/../states/entities/state.entity{.ts,.js}',
            __dirname + '/../cities/entities/city.entity{.ts,.js}',
            __dirname + '/../countries/entities/country.entity{.ts,.js}',
          ],
          migrations: [__dirname + '/../../db-migration/*.{ts,js}'],
          migrationsTableName: 'migrations',
          synchronize: true,
          logging: false,
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
