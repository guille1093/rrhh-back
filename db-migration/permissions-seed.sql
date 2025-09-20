-- SQL script to populate permissions for all CRUD actions and reports endpoints
-- Run this script to insert all required permissions into the permissions table

INSERT INTO permissions (name, description)
VALUES
  -- Áreas
  ('create:areas', 'Crear áreas'),
  ('read:areas', 'Ver áreas'),
  ('update:areas', 'Actualizar áreas'),
  ('delete:areas', 'Eliminar áreas'),

  -- Departamentos
  ('create:departments', 'Crear departamentos'),
  ('read:departments', 'Ver departamentos'),
  ('update:departments', 'Actualizar departamentos'),
  ('delete:departments', 'Eliminar departamentos'),

  -- Puestos
  ('create:positions', 'Crear puestos'),
  ('read:positions', 'Ver puestos'),
  ('update:positions', 'Actualizar puestos'),
  ('delete:positions', 'Eliminar puestos'),

  -- Empleados
  ('create:employees', 'Crear empleados'),
  ('read:employees', 'Ver empleados'),
  ('update:employees', 'Actualizar empleados'),
  ('delete:employees', 'Eliminar empleados'),

  -- Compañías
  ('create:companies', 'Crear compañías'),
  ('read:companies', 'Ver compañías'),
  ('update:companies', 'Actualizar compañías'),
  ('delete:companies', 'Eliminar compañías'),

  -- Reports (uno por endpoint)
  ('read:reports-employees-count', 'Ver cantidad de empleados'),
  ('read:reports-employees-by-structure', 'Ver empleados por estructura'),
  ('read:reports-contracts-types', 'Ver tipos de contratos'),
  ('read:reports-contracts-list', 'Ver lista de contratos'),
  ('read:reports-pending-requests', 'Ver solicitudes pendientes'),
  ('read:reports-upcoming-holidays', 'Ver próximos feriados')
ON CONFLICT (name) DO NOTHING;
