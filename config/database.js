const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    // await mongoose.connect(
    //   "mongodb+srv://buiquangtruong170302:quangtruong1703@productmanagement.4ic2vcc.mongodb.net/tasks_management"
    // );
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Kết nối cơ sở dữ liệu thành công!!!");
  } catch (error) {
    console.log("Kết nối cơ sở dữ liệu thất bại!!!");
  }
};
