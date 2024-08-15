import { QueryResult } from 'pg';
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
                'Exit'
            ]
        }
    ])
    .then((answers) => {

        switch(answers) {
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

            case 'Exit':
                break;
        }
    });
};

//view all departments
const viewAllDepartments = () => {
    const sql = 'SELECT * FROM departments'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }

    });
};


//view all roles
const viewAllRoles = () => {
    const sql = 'SELECT * FROM roles'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
    });
};

//view all employees
const viewAllEmployees = () => {
    const sql = 'SELECT * FROM employees'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
    });
};

//add new department
const addNewDepartment = () => {
    const sql = 'INSERT INTO departments (name) VALUES ($1)';
    const params = [''];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
    });
};

//add new role
const addNewRole = () => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
    const params = [''];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result.rows)
        }
    });
};

//add new employee
const addNewEmployee = () => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)';
    const params = [''];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
    });
};

//update employeee role
const updateEmployeeRole = () => {
    const sql = `UPDATE employees SET role_id = $1 WHERE id = $2`;
    const params = [''];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
    });
};

promptUser();
