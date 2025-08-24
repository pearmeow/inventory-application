const { Router } = require("express");
const readController = require("../controllers/readController");
const readRouter = Router();

readRouter.get("/");

module.exports = readRouter;
