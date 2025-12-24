const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/studyPlan');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

  

