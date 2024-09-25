const md5 = require("md5");
const generateRandom = require("../../../helpers/generateString");
const User = require("../models/user.mode");
const ForgotPassword = require("../models/forgot-password.model");
const sendMail = require("../../../helpers/sendMail");

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    req.body.tokenUser = generateRandom.generateRandomSring(20);
    const exitsEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (exitsEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại!",
      });
    } else {
      const user = new User(req.body);
      await user.save();
      const token = user.tokenUser;
      res.cookie("token", token);
      res.json({
        code: 200,
        message: "Tạo tài khoản thành công!",
        token: token,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  try {
    const password = md5(req.body.password);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        code: 400,
        message: "Email không tồn tại!",
      });
      return;
    } else {
      if (user.password === password) {
        res.cookie("token", user.tokenUser);
        res.json({
          code: 200,
          message: "Đăng nhập thành công!",
          token: user.tokenUser,
        });
      } else {
        res.json({
          code: 400,
          message: "Mật khẩu không đúng!",
        });
      }
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email, deleted: false });
    if (!user) {
      res.json({
        code: 400,
        message: "Email không tồn tại!",
      });
    } else {
      const OTP = generateRandom.generateRandomNumber(6);
      const timeExpire = 5;
      const objForgotPassword = {
        email: email,
        otp: OTP,
        expireAt: Date.now() + timeExpire * 60,
      };
      const forgotPassword = new ForgotPassword(objForgotPassword);
      await forgotPassword.save();
      // Gửi OTP qua mail
      const subject = "Mã OTP để lấy lại mật khẩu";
      const html = `Mã OTP để lấy lại mật khẩu của bạn là <b>${OTP}</b> và sẽ hết hạn trong ${timeExpire} phút. Vui lòng không cung cấp mã OTP này cho bất cứ ai`;
      sendMail.sendMail(email, subject, html);

      res.json({
        code: 200,
        message: `Mã OTP đã được gửi đến dịa chỉ ${email}`,
        otp: OTP,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
