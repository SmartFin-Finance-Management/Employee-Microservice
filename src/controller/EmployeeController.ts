import { Request, Response } from 'express';
import Employee from '../models/Employee';
import axios from 'axios';

// new Employee
export const createEmployee = async (req: Request, res: Response) => {
  const { employee_id, org_id, client_id, name, email, role, employee_type, experience, lpa, hourly_rate, project_id, project_history, project_manager_id, attendance } = req.body;

  try {
    const employee = await Employee.create({
      employee_id,
      org_id,
      client_id,
      name,
      email,
      role,
      employee_type,
      experience,
      lpa,
      hourly_rate,
      project_id,
      project_history,
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

// Add Attendance for an Employee
export const addAttendance = async (req: Request, res: Response) => {
  const { employee_id } = req.params;
  const { date, status } = req.body; // Expecting date and status in the request body

  try {
    const employee = await Employee.findOne({ employee_id });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    // Add new attendance record
    employee.attendance[date] = status;
    await employee.save();

    res.status(200).json({ message: 'Attendance added successfully', attendance: employee.attendance });
  } catch (error) {
    res.status(500).json({ error: `Error adding attendance: ${error}` });
  }
};

// Update Attendance for an Employee
export const updateAttendance = async (req: Request, res: Response) => {
  const { employee_id } = req.params;
  const { date, status } = req.body;

  try {
    const employee = await Employee.findOne({ employee_id });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    if (!employee.attendance[date]) {
      res.status(404).json({ error: 'Attendance record for this date not found' });
      return;
    }

    // Update attendance record
    employee.attendance[date] = status;
    await employee.save();

    res.status(200).json({ message: 'Attendance updated successfully', attendance: employee.attendance });
  } catch (error) {
    res.status(500).json({ error: `Error updating attendance: ${error}` });
  }
};

// get employees by Org id
export const getEmployeesByOrgId = async (req: Request, res: Response) => {
  const { org_id } = req.params;

  try {
    const employees = await Employee.find({ org_id });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: `Error fetching employees by org_id: ${error}` });
  }
};

// get employees by client_id
export const getEmployeesByClientId = async (req: Request, res: Response) => {
  const { client_id } = req.params;

  try {
    const employees = await Employee.find({ client_id });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: `Error fetching employees by client_id: ${error}` });
  }
};

// get employees by project_ID
export const getEmployeesByProjectId = async (req: Request, res: Response) => {
  const { project_id } = req.params;

  try {
    const employees = await Employee.find({ project_id });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: `Error fetching employees by project_id: ${error}` });
  }
};

// Mark project as completed for an employee
export const completeProjectForEmployee = async (req: Request, res: Response) => {
  const { employee_id } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    if (employee.project_id !== 0) {

      if (!employee.project_history.includes(employee.project_id)) {
        employee.project_history.push(employee.project_id);
      }
      employee.project_id = 0;
      await employee.save();
      res.status(200).json({
        message: 'Project marked as completed',
        project_history: employee.project_history,
        current_project_id: employee.project_id,
      });
    } else {
      res.status(400).json({ error: 'Employee is not assigned to the specified project' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error completing project: ${error}` });
  }
};

// Assign a new project to an employee
export const assignProjectToEmployee = async (req: Request, res: Response) => {
  const { employee_id, project_id } = req.params;
  
  try {
    const employee = await Employee.findOne({ employee_id });
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    employee.project_id = Number(project_id);
    await employee.save();

    res.status(200).json({
      message: 'Project assigned to employee',
      current_project_id: employee.project_id,
    });
  } catch (error) {
    res.status(500).json({ error: `Error assigning project: ${error}` });
  }
};

// salary calculation for employee
export const calculateEmployeeSalary = async (req: Request, res: Response) => {
  const { employee_id } = req.params;

  try {
      // Fetch employee by employee_id
      const employee = await Employee.findOne({ employee_id });

      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      // Calculate salary based on LPA or hourly rate
      const salary = employee.lpa ? employee.lpa / 12 : employee.hourly_rate * 8 * 22; // Assuming 22 working days per month

      res.status(200).json({
          employee_id: employee.employee_id,
          salary
      });
  } catch (error) {
      res.status(500).json({ error: `Error calculating salary: ${error}` });
  }
};

// salary calculation
export const calculateTotalSalary = async (req: Request, res: Response) => {
  const { employees_list } = req.body;

  try {
      // Fetch employees by list of employee IDs
      const employees = await Employee.find({ employee_id: { $in: employees_list } });

      if (!employees.length) {
          res.status(404).json({ error: 'No employees found for the given IDs' });
          return;
      }

      // Calculate salary for each employee and total salary
      let total_salary = 0;
      const employee_list = employees.map(employee => {
          const salary = employee.lpa ? employee.lpa / 12 : employee.hourly_rate * 8 * 22; // Assuming 22 working days
          total_salary += salary;
          return { employee_id: employee.employee_id, salary };
      });

      res.status(200).json({
          total_salary,
          employee_list
      });
  } catch (error) {
      res.status(500).json({ error: `Error calculating salaries: ${error}` });
  }
};