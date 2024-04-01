const mongoose = require('mongoose');

const Manager = require('../models/managerModel');
const Employee = require('../models/employeeModel');
const Timesheet = require('../models/timeSheetModel');

const addEmployee = async (req, res) => {
    try {
        const { name, managerId } = req.body;

        // Check if managerId is provided
        if (!managerId) {
            return res.status(400).json({ message: 'Manager ID is required' });
        }

        // Convert managerId to ObjectId
        const validManagerId = mongoose.Types.ObjectId.isValid(managerId);
        if (!validManagerId) {
            return res.status(400).json({ message: 'Invalid Manager ID' });
        }

        // Check if the manager exists
        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        // Create a new employee with the provided details
        const employee = new Employee({ name, reportingManager: managerId });
        await employee.save();

        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Example function to add a timesheet entry
// Example function to add a timesheet entry
const addTimesheetEntry = async (req, res) => {
    try {
      const { employeeId, date, hoursWorked } = req.body;
  
      console.log("Received employeeId:", employeeId); // Log received employeeId
  
      // Check if employee exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      // Create timesheet entry
      const timesheetEntry = new Timesheet({
        employee: employeeId,
        date,
        hoursWorked
      });
      await timesheetEntry.save();
      res.status(201).json({ message: 'Timesheet entry added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  addTimesheetEntry,
  addEmployee
};
