const User = require("../models/user.model");
module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = await User.findOne({
        tokenUser: token,
        deleted: false,
      }).select("-password");
      if (!user) {
        res.json({
          code: 400,
          message: "User không tồn tại!",
        });
        return;
      } else {
        req.user = user;
        next();
      }
    } else {
      res.json({
        code: 400,
        message: "Vui lòng gửi kèm token",
      });
    }
  } catch (error) {}
};
