// server.js
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');

//add your connection string
mongoose.connect('')

const app = express();
const PORT =  3000;

//mongoose.connect('mongodb://localhost/timesheetdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/employees', employeeRoutes);
app.use('/managers', managerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

