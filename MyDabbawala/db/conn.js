const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dabbawala",
  err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 });
  