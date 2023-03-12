USE company_db;
-- Defines initial departments
INSERT INTO departments (name) VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Finance');

-- Defines the initial roles
INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 90000, 1),
('Marketing Manager', 80000, 2),
('Software Engineer', 100000, 3),
('Financial Analyst', 75000, 4);

-- Define employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Tyler', 'Smith', 1, null),
('Marcus', 'Rodriguez', 2, null),
('Lisa', 'Proctor', 3, null),
('Tracy', 'Williams', 4, null);