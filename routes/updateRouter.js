const { Router } = require("express");
const updateController = require("../controllers/updateController");
const updateRouter = Router();

updateRouter.get("/", updateController.getUpdate);
updateRouter.get("/item", updateController.getUpdateItem);
updateRouter.get("/pool", updateController.getUpdatePool);
updateRouter.post("/item", updateController.postUpdateItem);
updateRouter.post("/pool", updateController.postUpdatePool);

module.exports = updateRouter;
