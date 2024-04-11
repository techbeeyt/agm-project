const authController = require("../controllers/AuthController");

const authRouter = require("express").Router();

authRouter.get("/status", authController.checkStatus);
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

module.exports = authRouter;
