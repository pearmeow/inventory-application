const { Router } = require("express");
const deleteController = require("../controllers/deleteController");
const deleteRouter = Router();

deleteRouter.get("/");

module.exports = deleteRouter;
