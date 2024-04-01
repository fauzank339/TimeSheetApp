// routes/employeeRoutes.js

const express = require('express')

const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Define route to add a new employee
router.post('/', employeeController.addEmployee);

// Define routes for employees to fill timesheets
router.post('/:employeeId/timesheets', employeeController.addTimesheetEntry);

module.exports = router;
