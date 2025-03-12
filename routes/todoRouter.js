const express = require("express");
const todoController = require("../controllers/todoController.js");
const todoRouter = express.Router();
 
//userRouter.use("/", userController.postUser);
// todoRouter.use("/", todoController.getTodos);
// todoRouter.use("/:id", todoController.getId);
// todoRouter.use("/delete", todoController.deleteTodo);
// todoRouter.use("/modify", todoController.modifyTodo);
// todoRouter.use("/postuser", todoController.postTodo);

// в роуте, который работает с некоторой сущностью, 
// в этом случае с todo'шкой, лучше называть роут именно так, 
// а для указания действий использовать специальные http методы,
// которые будут указывать на действие с сущностью
todoRouter.get("/", todoController.getTodos);
todoRouter.get("/:id", todoController.getId);
todoRouter.delete("/:id", todoController.deleteTodo);
todoRouter.put("/", todoController.modifyTodo);
todoRouter.post("/", todoController.postTodo);
 
module.exports = todoRouter;