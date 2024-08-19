INSERT INTO departments (department_name) 
VALUES ('English'),
       ('Science'),
       ('History'),
       ('Arts');

INSERT INTO roles (title, salary, department_id)
VALUES ('English Professor', 45.76, 1),
       ('Science Professor', 64.35, 2),
       ('History Professor', 26.75, 3),
       ('Art Professor', 75.45, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL),
       ('Samantha', 'Reynolds', 2, 1),
       ('Aaron', 'Heiser', 3, 2),
       ('Taylor', 'Jones', 4, 3);