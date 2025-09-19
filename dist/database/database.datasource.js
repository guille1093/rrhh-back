"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../users/entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: Number(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [user_entity_1.User, role_entity_1.Role, permission_entity_1.Permission],
    migrations: [__dirname + '/../../db-migration/*.{ts,js}'],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: false,
    ssl: { rejectUnauthorized: false },
});
//# sourceMappingURL=database.datasource.js.map