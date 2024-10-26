import { Request, Response } from 'express';
import Employee from '../models/Employee';

// new Employee
export const createEmployee = async (req: Request, res: Response) => {
  const { employee_id, org_id, name, email, role, employee_type, experience, lpa, hourly_rate, project_id, project_manager_id, attendance } = req.body;

  try {
    // Create a new employee using the Mongoose 
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
