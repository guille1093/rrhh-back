"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_DATABASE_NAME'),
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['./migrations/*.{ts,js}'],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: false,
    ssl: { rejectUnauthorized: false },
});
//# sourceMappingURL=database.datasource.js.map