const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    opt: String,
    expireAt: {
      type: Date,
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model(
  "",
  forgotPasswordSchema,
  "forgot-password"
);
module.exports = ForgotPassword;
