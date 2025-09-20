"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const state_entity_1 = require("../../states/entities/state.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
let City = class City {
    id;
    state;
    name;
    zip_code;
    clients;
    created_at;
    updated_at;
    deleted_at;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, state: { required: true, type: () => require("../../states/entities/state.entity").State }, name: { required: true, type: () => String }, zip_code: { required: true, type: () => String }, clients: { required: true, type: () => [require("../../clients/entities/client.entity").Client] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, deleted_at: { required: true, type: () => Date } };
    }
};
exports.City = City;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => state_entity_1.State, (state) => state.cities),
    __metadata("design:type", state_entity_1.State)
], City.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], City.prototype, "zip_code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_entity_1.Client, (client) => client.city),
    __metadata("design:type", Array)
], City.prototype, "clients", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], City.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], City.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], City.prototype, "deleted_at", void 0);
exports.City = City = __decorate([
    (0, typeorm_1.Entity)('cities')
], City);
//# sourceMappingURL=city.entity.js.map