const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// Define route to add a new manager
router.post('/', managerController.addManager);

// Define routes for managers to rate employees
router.post('/employees/:employeeId/rate', managerController.rateEmployee);

module.exports = router;
