const mongoose = require("mongoose");
const generateRandomSring = require("../../../helpers/generateString");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
