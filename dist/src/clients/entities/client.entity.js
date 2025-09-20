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
exports.Client = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("../../cities/entities/city.entity");
let Client = class Client {
    id;
    city;
    name;
    last_name;
    cuil;
    document_type;
    document_number;
    birthdate;
    residence;
    residence_number;
    floor;
    department;
    gender;
    email;
    phone;
    zip_code;
    occupation;
    dependency;
    account_number;
    cbu;
    credit_card;
    civil_status;
    created_at;
    updated_at;
    deleted_at;
    prefix;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, city: { required: true, type: () => require("../../cities/entities/city.entity").City }, name: { required: true, type: () => String }, last_name: { required: true, type: () => String }, cuil: { required: true, type: () => String }, document_type: { required: true, type: () => String }, document_number: { required: true, type: () => String }, birthdate: { required: true, type: () => Date }, residence: { required: true, type: () => String }, residence_number: { required: true, type: () => String }, floor: { required: true, type: () => String }, department: { required: true, type: () => String }, gender: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, zip_code: { required: true, type: () => String }, occupation: { required: true, type: () => String }, dependency: { required: true, type: () => String }, account_number: { required: true, type: () => String }, cbu: { required: true, type: () => String }, credit_card: { required: true, type: () => String }, civil_status: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, deleted_at: { required: true, type: () => Date }, prefix: { required: true, type: () => String } };
    }
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, (city) => city.clients),
    __metadata("design:type", city_entity_1.City)
], Client.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "cuil", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "document_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "document_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Client.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "residence", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "residence_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "zip_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Client.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: 'SI' }),
    __metadata("design:type", String)
], Client.prototype, "dependency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "cbu", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "credit_card", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "civil_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Client.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Client.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Client.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "prefix", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients'),
    (0, typeorm_1.Unique)(['cuil']),
    (0, typeorm_1.Unique)(['document_number'])
], Client);
//# sourceMappingURL=client.entity.js.map