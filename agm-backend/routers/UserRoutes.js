const { userController } = require("../controllers");
// const verifyToken = require("../middlewares/verifyToken");
const userRouter = require("express").Router();

userRouter.get("/crop", userController.getCrop);
userRouter.get("/yard", userController.getYard);
userRouter.get("/states", userController.getStates);
userRouter.get("/districts", userController.getAllDistricts);
userRouter.get("/districts/:state", userController.getDistrictsByState);
userRouter.get("/markets", userController.getAllMarkets);
userRouter.get("/markets/:district", userController.getMarketsByDistrict);

module.exports = userRouter;
