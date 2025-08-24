const {
    query,
    body,
    validationResult,
    matchedData,
} = require("express-validator");
const {
    createItem,
    createPool,
    createItemToPool,
} = require("../db/queries.js");

const getCreate = (req, res) => {
    res.render("create", { title: "Create" });
};
const getCreateItem = (req, res) => {
    res.render("create/item", { title: "Create Item" });
};
const getCreatePool = (req, res) => {
    res.render("create/pool", { title: "Create Pool" });
};
const getCreateItemToPool = (req, res) => {
    res.render("create/itemtopool", { title: "Create Item to Pool" });
};

const validateName = body("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty");

const postCreateItem = [
    validateName,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("create/item", {
                title: "Create Item",
                errors: errors,
            });
        }
        const data = matchedData(req);
        createItem(data.name);
        res.redirect("/");
    },
];

const postCreatePool = [
    validateName,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("create/pool", {
                title: "Create Pool",
                errors: errors,
            });
        }
        const data = matchedData(req);
        createPool(data.name);
        res.redirect("/");
    },
];

const validatePair = [
    body("item").trim().notEmpty().withMessage("Item must not be empty"),
    body("pool").trim().notEmpty().withMessage("Pool must not be empty"),
];

const postCreateItemToPool = [
    validatePair,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("create/pool", {
                title: "Create Item to Pool",
                errors: errors,
            });
        }
        const data = matchedData(req);
        createItemToPool(data.item, data.pool);
        res.redirect("/");
    },
];

module.exports = {
    getCreate,
    getCreateItem,
    getCreatePool,
    getCreateItemToPool,
    postCreateItem,
    postCreatePool,
    postCreateItemToPool,
};
