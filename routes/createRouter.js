const { Router } = require("express");
const createController = require("../controllers/createController");
const createRouter = Router();

createRouter.get("/", createController.getCreate);
createRouter.get("/item", createController.getCreateItem);
createRouter.get("/pool", createController.getCreatePool);
createRouter.get("/itemtopool", createController.getCreateItemToPool);
createRouter.post("/item", createController.postCreateItem);
createRouter.post("/pool", createController.postCreatePool);
createRouter.post("/itemtopool", createController.postCreateItemToPool);

module.exports = createRouter;
