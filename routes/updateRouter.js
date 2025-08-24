const { Router } = require("express");
const updateController = require("../controllers/updateController");
const updateRouter = Router();

updateRouter.get("/");

module.exports = updateRouter;
