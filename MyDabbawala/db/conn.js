const mongoose = require("mongoose");

// Connecting to mongodb server
mongoose.connect("mongodb://localhost:27017/dabbawala",
  err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
  });