const { userController } = require("../controllers");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = require("express").Router();

userRouter.get("/crop", userController.getCrop);
userRouter.get("/yard", userController.getYard);

module.exports = userRouter;
