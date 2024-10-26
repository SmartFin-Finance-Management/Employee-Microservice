import express from 'express';
import { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee 
  } from '../controller/EmployeeController';

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/:employee_id', getEmployeeById);
router.put('/employees/:employee_id', updateEmployee);
router.delete('/employees/:employee_id', deleteEmployee);

export default router;
