"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../users/entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const area_entity_1 = require("../areas/entities/area.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const position_entity_1 = require("../positions/entities/position.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const contract_entity_1 = require("../employees/entities/contract.entity");
const request_entity_1 = require("../requests/entities/request.entity");
const holiday_entity_1 = require("../holidays/entities/holiday.entity");
const health_entity_1 = require("../health/entities/health.entity");
const evaluation_entity_1 = require("../evaluations/entities/evaluation.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const state_entity_1 = require("../states/entities/state.entity");
const city_entity_1 = require("../cities/entities/city.entity");
const country_entity_1 = require("../countries/entities/country.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: Number(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [
        user_entity_1.User,
        role_entity_1.Role,
        permission_entity_1.Permission,
        company_entity_1.Company,
        area_entity_1.Area,
        department_entity_1.Department,
        position_entity_1.Position,
        employee_entity_1.Employee,
        contract_entity_1.Contract,
        request_entity_1.Request,
        holiday_entity_1.Holiday,
        health_entity_1.Health,
        evaluation_entity_1.Evaluation,
        client_entity_1.Client,
        state_entity_1.State,
        city_entity_1.City,
        country_entity_1.Country,
    ],
    migrations: [__dirname + '/../../db-migration/*.{ts,js}'],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: false,
    ssl: { rejectUnauthorized: false },
});
//# sourceMappingURL=database.datasource.js.map