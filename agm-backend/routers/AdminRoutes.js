const upload = require("../config/multer");
const { adminController } = require("../controllers");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("express").Router();

adminRouter.post(
  "/upload",
  upload.single("file"),
  adminController.uploadExcelFile
);

adminRouter.put("/data/:id", adminController.update);
adminRouter.delete("/data/:id", adminController._delete);

module.exports = adminRouter;
