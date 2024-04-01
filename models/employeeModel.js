const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

module.exports = mongoose.model('Employee', employeeSchema);
