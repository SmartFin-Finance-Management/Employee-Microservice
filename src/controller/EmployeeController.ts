import { Request, Response } from 'express';
import Employee from '../models/Employee';
import axios from 'axios';

// new Employee
export const createEmployee = async (req: Request, res: Response) => {
  const { employee_id, org_id, name, email, role, employee_type, experience, lpa, hourly_rate, project_id, project_manager_id, attendance } = req.body;

  try {
    const employee = await Employee.create({
      employee_id,
      org_id,
      name,
      email,
      role,
      employee_type,
      experience,
      lpa,
      hourly_rate,
      project_id, 
      project_manager_id, 
      attendance,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: `Error creating employee: ${error}` });
  }
};

// Get all Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: `Error fetching employees: ${error}` });
  }
};


// Get an EmployeeById
export const getEmployeeById = async (req: Request, res: Response) => {
    const { employee_id } = req.params;
  
    try {
      const employee = await Employee.findOne({ employee_id });
  
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: `Error fetching employee: ${error}` });
    }
  };
  
  // Update an Employee
  export const updateEmployee = async (req: Request, res: Response) => {
    const { employee_id } = req.params;
    const updates = req.body;
  
    try {
      const employee = await Employee.findOneAndUpdate({ employee_id }, updates, { new: true, runValidators: true });
  
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: `Error updating employee: ${error}` });
    }
  };
  
  // Delete an Employee
  export const deleteEmployee = async (req: Request, res: Response) => {
    const { employee_id } = req.params;
  
    try {
      const employee = await Employee.findOneAndDelete({ employee_id });
  
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(204).json(); // No content to 
    } catch (error) {
      res.status(500).json({ error: `Error deleting employee: ${error}` });
    }
  };