const { Router } = require("express");
const deleteController = require("../controllers/deleteController");
const deleteRouter = Router();

deleteRouter.get("/", deleteController.getDelete);
deleteRouter.get("/item", deleteController.getDeleteItem);
deleteRouter.get("/pool", deleteController.getDeletePool);
deleteRouter.get("/itemtopool", deleteController.getDeleteItemToPool);
deleteRouter.post("/item", deleteController.postDeleteItem);
deleteRouter.post("/pool", deleteController.postDeletePool);
deleteRouter.post("/itemtopool", deleteController.postDeleteItemToPool);

module.exports = deleteRouter;
