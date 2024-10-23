const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful!");
  } catch (error) {
    console.log("Database connection failed!");
    console.log(error);
  }
};
