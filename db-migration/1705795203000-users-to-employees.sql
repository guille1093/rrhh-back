INSERT INTO employees ("firstName", "lastName", email, "departmentId", "positionId")
SELECT
  u.first_name,
  u.last_name,
  u.email,
  d.id AS department_id,
  p.id AS position_id
FROM users u
CROSS JOIN LATERAL (
  SELECT id FROM departments ORDER BY random() LIMIT 1
) d
CROSS JOIN LATERAL (
  SELECT id FROM positions WHERE "departmentId" = d.id ORDER BY random() LIMIT 1
) p;

INSERT INTO contracts ("employeeId", "contractType", "startDate", salary)
SELECT e.id, 'Indeterminado', CURRENT_DATE, 100000 + (random()*50000)::int
FROM employees e
WHERE NOT EXISTS (
  SELECT 1 FROM contracts c WHERE c."employeeId" = e.id
);
