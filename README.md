# Employee Tracker

This project is made to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Features

If your project has a lot of features, list them here.

## User Stories

AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company

SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input

*    WHEN I start the application
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

*   WHEN I choose to view all departments
    THEN I am presented with a formatted table showing department names and department ids

*   WHEN I choose to view all roles
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

*   WHEN I choose to view all employees
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

*   WHEN I choose to add a department
    THEN I am prompted to enter the name of the department and that department is added to the database

*   WHEN I choose to add a role
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

*   WHEN I choose to add an employee
    THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database

*   WHEN I choose to update an employee role
    THEN I am prompted to select an employee to update and their new role and this information is updated in the database

---

## Assets

Design the following database schema that contains two tables:

![The database schema includes a departments table a roles table and a employees table, linked by the department id.](./assets/image_1.png)

---


## 🏆 Bonus

Try to add some additional functionality to your application, such as the ability to do the following:

Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
