const { Router } = require("express");
const getData = require("../controllers/readController");
const readRouter = Router();

readRouter.get("/", getData);

module.exports = readRouter;
