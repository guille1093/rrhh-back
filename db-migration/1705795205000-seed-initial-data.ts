import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1705795205000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const companies = [
      {
        name: 'TechNova',
        address: 'Av. Corrientes 1234, CABA',
        phone: '011-1234-5678',
        email: 'info@technova.com',
        industry: 'Tecnología',
      },
      {
        name: 'AgroSur',
        address: 'Ruta 8 km 45, Santa Fe',
        phone: '0342-567-8901',
        email: 'contacto@agrosur.com',
        industry: 'Agroindustria',
      },
      {
        name: 'SaludPlus',
        address: 'Calle 9 de Julio 456, Córdoba',
        phone: '0351-234-5678',
        email: 'info@saludplus.com',
        industry: 'Salud',
      },
      {
        name: 'FinanRed',
        address: 'Av. Libertador 789, Mendoza',
        phone: '0261-345-6789',
        email: 'info@finanred.com',
        industry: 'Finanzas',
      },
      {
        name: 'ConstruAr',
        address: 'Av. Belgrano 321, Rosario',
        phone: '0341-456-7890',
        email: 'info@construar.com',
        industry: 'Construcción',
      },
      {
        name: 'EducaPro',
        address: 'Calle San Martín 654, La Plata',
        phone: '0221-567-8901',
        email: 'info@educapro.com',
        industry: 'Educación',
      },
      {
        name: 'RetailMax',
        address: 'Av. Rivadavia 987, Mar del Plata',
        phone: '0223-678-9012',
        email: 'info@retailmax.com',
        industry: 'Retail',
      },
      {
        name: 'LogistiCo',
        address: 'Ruta 2 km 30, Bahía Blanca',
        phone: '0291-789-0123',
        email: 'info@logistico.com',
        industry: 'Logística',
      },
      {
        name: 'EnerSol',
        address: 'Av. Alem 111, Neuquén',
        phone: '0299-890-1234',
        email: 'info@enersol.com',
        industry: 'Energía',
      },
      {
        name: 'TurisAr',
        address: 'Calle Mitre 222, Bariloche',
        phone: '0294-901-2345',
        email: 'info@turisar.com',
        industry: 'Turismo',
      },
    ];
    const companyIds: number[] = [];
    for (const c of companies) {
      const result = await queryRunner.query(
        `INSERT INTO companies (name, address, phone, email, industry) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [c.name, c.address, c.phone, c.email, c.industry],
      );
      companyIds.push(result[0].id);
    }

    for (const companyId of companyIds) {
      // Áreas únicas por compañía
      const areaNames = ['Administración', 'Operaciones', 'Comercial'];
      const areaIds: number[] = [];
      for (const areaName of areaNames) {
        let areaId: number;
        try {
          const areaResult = await queryRunner.query(
            `INSERT INTO areas (name, company_id) VALUES ($1, $2) RETURNING id`,
            [areaName, companyId],
          );
          areaId = areaResult[0].id;
        } catch (e) {
          // Si ya existe, obtener el id existente
          const existing = await queryRunner.query(
            `SELECT id FROM areas WHERE name = $1 AND company_id = $2`,
            [areaName, companyId],
          );
          areaId = existing[0].id;
        }
        areaIds.push(areaId);
      }

      // Departamentos únicos por área
      for (const [i, areaId] of areaIds.entries()) {
        let deptNames: string[] = [];
        if (i === 0) deptNames = ['Recursos Humanos', 'Legales'];
        else if (i === 1) deptNames = ['Producción', 'Logística'];
        else if (i === 2) deptNames = ['Ventas', 'Marketing'];
        const deptIds: number[] = [];
        for (const deptName of deptNames) {
          let deptId: number;
          try {
            const deptResult = await queryRunner.query(
              `INSERT INTO departments (name, area_id) VALUES ($1, $2) RETURNING id`,
              [deptName, areaId],
            );
            deptId = deptResult[0].id;
          } catch (e) {
            const existing = await queryRunner.query(
              `SELECT id FROM departments WHERE name = $1 AND area_id = $2`,
              [deptName, areaId],
            );
            deptId = existing[0].id;
          }
          deptIds.push(deptId);
        }

        // Puestos únicos por departamento
        for (const deptId of deptIds) {
          const posNames = ['Jefe', 'Analista', 'Asistente'];
          for (const posName of posNames) {
            try {
              await queryRunner.query(
                `INSERT INTO positions (name, department_id) VALUES ($1, $2)`,
                [posName, deptId],
              );
            } catch (e) {
              // Si ya existe, ignorar
            }
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM positions');
    await queryRunner.query('DELETE FROM departments');
    await queryRunner.query('DELETE FROM areas');
    await queryRunner.query('DELETE FROM companies');
  }
}
