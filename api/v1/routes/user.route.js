const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", controller.resetPassword);
router.get("/detail", authMiddleware, controller.detail);
router.get("/list-user", authMiddleware, controller.listUser);

module.exports = router;
