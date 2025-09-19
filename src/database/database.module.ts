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
