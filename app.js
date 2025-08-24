const express = require("express");
const path = require("node:path");
const createRouter = require("./routes/createRouter");
const readRouter = require("./routes/readRouter");
const updateRouter = require("./routes/updateRouter");
const deleteRouter = require("./routes/deleteRouter");

const app = express();
app.use(express.urlencoded({ extended: true })); // make post work and have a body
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", readRouter);
app.use("/create", createRouter);
app.use("/delete", deleteRouter);
app.use("/update", updateRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on http://127.0.0.1:${PORT}`);
});
