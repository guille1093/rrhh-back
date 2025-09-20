import { MigrationInterface, QueryRunner } from 'typeorm';

export class IntegratedCompanyFields1705795204000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agregar industry, phone y email si no existen
    await queryRunner.query(
      `ALTER TABLE companies ADD COLUMN IF NOT EXISTS industry varchar(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone varchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE companies ADD COLUMN IF NOT EXISTS email varchar(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE companies DROP COLUMN IF EXISTS industry`,
    );
    await queryRunner.query(
      `ALTER TABLE companies DROP COLUMN IF EXISTS phone`,
    );
    await queryRunner.query(
      `ALTER TABLE companies DROP COLUMN IF EXISTS email`,
    );
  }
}
