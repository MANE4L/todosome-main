const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
 
//userRouter.use("/", userController.postUser);
userRouter.use("/", userController.getUsers);
userRouter.use("/:id", userController.getId);
userRouter.use("/delete", userController.deleteUser);
userRouter.use("/modify", userController.modifyUser);
userRouter.use("/postuser", userController.postUser);
 
module.exports = userRouter;