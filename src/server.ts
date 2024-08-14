import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//view all departments
app.get('/api/departments', (_req, res) => {
    const sql = 'SELECT * FROM departments'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

//view all roles
app.get('/api/roles', (_req, res) => {
    const sql = 'SELECT * FROM roles'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

//view all employees
app.get('/api/employees', (_req, res) => {
    const sql = 'SELECT * FROM employees'

    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

//add new department
app.post('/api/new-department', ({ body }, res) => {
    const sql = 'INSERT INTO departments (name) VALUES ($1)';
    const params = [body.name];

    pool.query(sql, params, (err, _result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body,
        });
    });
});

//add new role
app.post('/api/new-role', ({ body }, res) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
    const params = [body.title, body.salary, body.department_id];

    pool.query(sql, params, (err, _result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body,
        });
    });
});

//add new employee
app.post('/api/new-employee', ({ body }, res) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)';
    const params = [body.first_name, body.last_name, body.role_id];

    pool.query(sql, params, (err, _result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body,
        });
    });
});

//update employeee role
app.put('api/employee/:role_id', (req, res) =>{
    const sql = `UPDATE employees SET role_id = $1 WHERE id = $2`;
    const params = [req.params.role_id, req.body.id];
  
    pool.query(sql, params, (err: Error, result: QueryResult) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.rowCount) {
        res.json({
          message: 'Employee not found',
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.rowCount,
        });
      }
    });
});

// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });