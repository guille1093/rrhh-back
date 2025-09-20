"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegratedCompanyFields1705795204000 = void 0;
class IntegratedCompanyFields1705795204000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE companies ADD COLUMN IF NOT EXISTS industry varchar(100)`);
        await queryRunner.query(`ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone varchar(255)`);
        await queryRunner.query(`ALTER TABLE companies ADD COLUMN IF NOT EXISTS email varchar(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE companies DROP COLUMN IF EXISTS industry`);
        await queryRunner.query(`ALTER TABLE companies DROP COLUMN IF EXISTS phone`);
        await queryRunner.query(`ALTER TABLE companies DROP COLUMN IF EXISTS email`);
    }
}
exports.IntegratedCompanyFields1705795204000 = IntegratedCompanyFields1705795204000;
//# sourceMappingURL=1705795204000-integrated-company-fields.js.map