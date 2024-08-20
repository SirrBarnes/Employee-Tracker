import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();


//prompt User
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add New Department',
                'Add New Role',
                'Add New Employee',
                'Update Employee Role',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'Exit'
            ]
        }
    ])
        .then(answers => {

            switch (answers.choices) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;

                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'Add New Department':
                    addNewDepartment();
                    break;

                case 'Add New Role':
                    addNewRole();
                    break;

                case 'Add New Employee':
                    addNewEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Delete Department':
                    deleteDepartment();
                    break;

                case 'Delete Role':
                    deleteRoles();
                    break;

                case 'Delete Employee':
                    deleteEmployee();
                    break;

                case 'Exit':
                    process.exit();
                    break;

                default:
                    promptUser();
            }
        });
};

//view all departments
const viewAllDepartments = () => {
    const sql = 'SELECT * FROM departments';

    pool.query(sql, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result.rows); 
        }
        promptUser();
    });
};

//view all roles
const viewAllRoles = () => {
    const sql = 'SELECT * FROM roles';

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else if (result) {
            console.table(result.rows);
        }
        promptUser();
    });
};

//view all employees
const viewAllEmployees = () => {
    const sql = 'SELECT * FROM employees';

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else if (result) {
            console.table(result.rows);
        }
        promptUser();
    });
};

//add new department
const addNewDepartment = () => {
    inquirer.prompt([
        { name: 'department_name', message: 'Enter New Department: ' }

    ]).then(answers => {
        const sql = 'INSERT INTO departments (department_name) VALUES ($1)';
        const params = [answers.department_name];

        pool.query(sql, params, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Department added successfully');
            }
            promptUser();
        });
    });
};

//add new role
const addNewRole = () => {
    inquirer.prompt([
        { name: 'title', message: 'Enter Title: ' },
        { name: 'salary', message: 'Enter Salary: ' },
        { name: 'department_id', message: 'Enter Department ID: ' }

    ]).then(answers => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';

        const params = [answers.title, answers.salary, answers.department_id];

        pool.query(sql, params, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Role added successfully');
            }
        });
    });
};

//add new employee
const addNewEmployee = () => {
    inquirer.prompt([
        { name: 'first_name', message: 'Enter First Name: '},
        { name: 'last_name', message: 'Enter Last Name: '},
        { name: 'role_id', message: 'Enter Role ID: '},
        { name: 'manager_id', message: 'Enter Manager ID: '}

    ]).then(answers => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3)';

        const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

        pool.query(sql, params, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Employee added successfully');
            }
            promptUser();
        });
    })
};

//update employeee role
const updateEmployeeRole = () => {
    inquirer.prompt([
        { name: 'role_id', message: '' },
        { name: 'id', message: '' }

    ]).then(answers => {
        const sql = `UPDATE employees SET role_id = $1 WHERE id = $2`;
        const params = [answers.role_id, answers.id];

        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(result.rows);
            }
        });
    });
};

//Update employee managers.


//view employees by manager
// const viewEmployeeByManager = () => {
//     const sql = 'SELECT employees.id AS ID, employees.first_name AS FirstName, employees.last_name AS LastName FROM employees JOIN employees ON employees.manager_id = employees.id';

//     pool.query(sql, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.table(res.rows);
//         }
//         promptUser();
//     });
// };

//view employees by department
// const viewEmployeesByDepartment = () => {
//     const sql = `SELECT employees.id, employees.first_name, employees.last_name, employees.role_id
//     FROM employees 
//     JOIN departments ON employee.role_id = departments.id 
//     ORDER BY role_id; 
//     `;
//     pool.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.table(result.rows);
//         }
//         promptUser();
//     });
// };

//delete departments
const deleteDepartment = () => {
    const sql = 'SELECT id, department_name FROM departments';

    pool.query(sql, (err, res) => {
        if (err) {
            console.error(err);
            promptUser();
        } else {
            const departments = res.rows.map(department => ({
                name: `${department.department_name}`,
                value: department.id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Select a department: ',
                    choices: departments
                }
            ]).then(answers => {
                const query = `DELETE FROM departments WHERE id = $1`;
                const values = [answers.id];

                pool.query(query, values, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Department deleted successfully.');
                    }
                    promptUser();
                });
            });
        }
    });
};

//delete roles
const deleteRoles = () => {
    const sql = 'SELECT id, title, salary FROM roles';

    pool.query(sql, (err, res) => {
        if (err) {
            console.error(err);
            promptUser();
        } else {
            const roles = res.rows.map(roles => ({
                name: `${roles.title} ${roles.salary}`,
                value: roles.id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Select a role: ',
                    choices: roles
                }
            ]).then(answers => {
                const query = `DELETE FROM roles WHERE id = $1`;
                const values = [answers.id];

                pool.query(query, values, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Role deleted successfully.');
                    }
                    promptUser();
                });
            });
        }
    });
};

//delete employees
const deleteEmployee = () => {
    const sql = 'SELECT id, first_name, last_name FROM employees';

    pool.query(sql, (err, res) => {
        if (err) {
            console.error(err);
            promptUser();
        } else {
            const employees = res.rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Select an employee: ',
                    choices: employees
                }
            ]).then(answers => {
                const query = `DELETE FROM employees WHERE id = $1`;
                const values = [answers.Id];

                pool.query(query, values, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Employee deleted successfully.');
                    }
                    promptUser();
                });
            });
        }
    });
};

//View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
promptUser();
