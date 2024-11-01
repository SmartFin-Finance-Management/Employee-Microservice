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
    completeProjectForEmployee,
    assignProjectToEmployee,
    calculateEmployeeSalary,
    calculateTotalSalary,
    getMaxEmployeeId
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
router.get('/employees/orgs/:org_id', getEmployeesByOrgId);
router.get('/employees/client/:client_id', getEmployeesByClientId);
router.get('/employees/projects/:project_id', getEmployeesByProjectId);

// Project
router.get('/employees/projectCompleted/:employee_id', completeProjectForEmployee);
router.get('/employees/assignProject/:employee_id/:project_id', assignProjectToEmployee);

// Salary
router.get('/employees/calculateSalary/:employee_id', calculateEmployeeSalary);
router.post('/employees/calculateSalaries', calculateTotalSalary);

// unique id
router.get('/employee/getUniqueId', getMaxEmployeeId);

export default router;
