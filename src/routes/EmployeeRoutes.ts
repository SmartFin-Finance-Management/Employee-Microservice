import express from 'express';
import { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee,  
    addAttendance, 
    updateAttendance,
    getEmployeesByOrgId,
    getEmployeesByClientId,
    getEmployeesByProjectId,
  } from '../controller/EmployeeController';

const router = express.Router();

// CRUD
router.get('/employees', getAllEmployees);
router.get('/employees/:employee_id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:employee_id', updateEmployee);
router.delete('/employees/:employee_id', deleteEmployee);

// Attendance
router.post('/employees/:employee_id/attendance', addAttendance);
router.put('/employees/:employee_id/attendance', updateAttendance);

//  Filter by OrgId, ClientId, ProjectId
router.get('/employees/organization/:org_id', getEmployeesByOrgId);
router.get('/employees/client/:client_id', getEmployeesByClientId);
router.get('/employees/project/:project_id', getEmployeesByProjectId);


export default router;
