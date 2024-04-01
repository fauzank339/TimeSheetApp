// controllers/managerController.js
const Manager = require('../models/managerModel');
const Employee = require('../models/employeeModel');
const Timesheet = require('../models/timeSheetModel');

// Function to add a new manager
const addManager = async (req, res) => {
  try {
    const { name, email } = req.body;
    const manager = new Manager({ name, email });
    await manager.save();
    res.status(201).json(manager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to rate an employee
const rateEmployee = async (req, res) => {
  try {
    const { employeeId, date, rating } = req.body;

    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the timesheet entry exists for the given date
    const timesheetEntry = await Timesheet.findOne({ employee: employeeId, date });
    if (!timesheetEntry) {
      return res.status(404).json({ message: 'Timesheet entry not found' });
    }

    // Check if the employee has already been rated for this date
    if (timesheetEntry.isRated) {
      return res.status(400).json({ message: 'Employee has already been rated for this date' });
    }

    // Update the timesheet entry with the rating and mark as rated
    timesheetEntry.rating = rating;
    timesheetEntry.isRated = true;
    await timesheetEntry.save();

    res.status(200).json({ message: 'Employee rated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addManager,
  rateEmployee
};
