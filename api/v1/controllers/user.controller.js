const md5 = require("md5");
const generateRandomSring = require("../../../helpers/generateString");
const User = require("../models/user.mode");

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    req.body.tokenUser = generateRandomSring.generateRandomSring(20);
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
