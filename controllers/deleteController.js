const {
    query,
    body,
    validationResult,
    matchedData,
} = require("express-validator");
const {
    deleteItem,
    deletePool,
    deleteItemToPool,
    readAllItems,
    readAllPools,
} = require("../db/queries.js");

const getDelete = (req, res) => {
    res.render("delete", { title: "Delete", errors: [] });
};
const getDeleteItem = async (req, res) => {
    const items = await readAllItems();
    res.render("delete/item", {
        title: "Delete Item",
        errors: [],
        items: items,
    });
};
const getDeletePool = async (req, res) => {
    const pools = await readAllPools();
    res.render("delete/pool", {
        title: "Delete Pool",
        errors: [],
        pools: pools,
    });
};
const getDeleteItemToPool = async (req, res) => {
    const items = await readAllItems();
    const pools = await readAllPools();
    res.render("delete/itemtopool", {
        title: "Delete Item from Pool",
        errors: [],
        items: items,
        pools: pools,
    });
};

const validateName = body("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty");

const postDeleteItem = [
    validateName,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("delete/item", {
                title: "Delete Item",
                errors: errors,
            });
        }
        const data = matchedData(req);
        deleteItem(data.name);
        res.redirect("/");
    },
];

const postDeletePool = [
    validateName,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("delete/pool", {
                title: "Delete Pool",
                errors: errors,
            });
        }
        const data = matchedData(req);
        deletePool(data.name);
        res.redirect("/");
    },
];

const validatePair = [
    body("item").trim().notEmpty().withMessage("Item must not be empty"),
    body("pool").trim().notEmpty().withMessage("Pool must not be empty"),
];

const postDeleteItemToPool = [
    validatePair,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("delete/pool", {
                title: "Delete Item to Pool",
                errors: errors,
            });
        }
        const data = matchedData(req);
        deleteItemToPool(data.item, data.pool);
        res.redirect("/");
    },
];

module.exports = {
    getDelete,
    getDeleteItem,
    getDeletePool,
    getDeleteItemToPool,
    postDeleteItem,
    postDeletePool,
    postDeleteItemToPool,
};
