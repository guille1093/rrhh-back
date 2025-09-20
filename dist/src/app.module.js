"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const database_module_1 = require("./database/database.module");
const companies_module_1 = require("./companies/companies.module");
const clients_module_1 = require("./clients/clients.module");
const areas_module_1 = require("./areas/areas.module");
const cities_module_1 = require("./cities/cities.module");
const departments_module_1 = require("./departments/departments.module");
const countries_module_1 = require("./countries/countries.module");
const positions_module_1 = require("./positions/positions.module");
const states_module_1 = require("./states/states.module");
const employees_module_1 = require("./employees/employees.module");
const permissions_module_1 = require("./permissions/permissions.module");
const requests_module_1 = require("./requests/requests.module");
const health_module_1 = require("./health/health.module");
const evaluations_module_1 = require("./evaluations/evaluations.module");
const reports_module_1 = require("./reports/reports.module");
const alerts_module_1 = require("./alerts/alerts.module");
const holidays_module_1 = require("./holidays/holidays.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            database_module_1.DatabaseModule,
            clients_module_1.ClientsModule,
            cities_module_1.CitiesModule,
            states_module_1.StatesModule,
            countries_module_1.CountriesModule,
            permissions_module_1.PermissionsModule,
            companies_module_1.CompaniesModule,
            areas_module_1.AreasModule,
            departments_module_1.DepartmentsModule,
            positions_module_1.PositionsModule,
            employees_module_1.EmployeesModule,
            requests_module_1.RequestsModule,
            holidays_module_1.HolidaysModule,
            health_module_1.HealthModule,
            evaluations_module_1.EvaluationsModule,
            reports_module_1.ReportsModule,
            alerts_module_1.AlertsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map