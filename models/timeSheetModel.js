const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5 },
  isRated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
