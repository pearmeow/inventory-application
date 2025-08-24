const { body, validationResult, matchedData } = require("express-validator");
const { updateItem, updatePool } = require("../db/queries.js");

const getUpdate = (req, res) => {
    res.render("update", { title: "Update", errors: [] });
};

const getUpdateItem = (req, res) => {
    res.render("update/item", { title: "Update Item", errors: [] });
};

const getUpdatePool = (req, res) => {
    res.render("update/pool", { title: "Update Pool", errors: [] });
};

const validatePair = [
    body("oldName").trim().notEmpty().withMessage("Name must not be empty"),
    body("newName").trim().notEmpty().withMessage("Name must not be empty"),
];

const postUpdateItem = [
    validatePair,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("update/item", {
                title: "Update Item",
                errors: errors,
            });
        }
        const data = matchedData(req);
        updateItem(data.oldName, data.newName);
        res.redirect("/");
    },
];

const postUpdatePool = [
    validatePair,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("update/pool", {
                title: "Update Pool",
                errors: errors,
            });
        }
        const data = matchedData(req);
        updatePool(data.oldName, data.newName);
        res.redirect("/");
    },
];

module.exports = {
    getUpdate,
    getUpdateItem,
    getUpdatePool,
    postUpdateItem,
    postUpdatePool,
};
