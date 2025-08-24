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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const items = await readAllItems();
            return res.render("delete/item", {
                title: "Delete Item",
                errors: errors.array(),
                items: items,
            });
        }
        const data = matchedData(req);
        deleteItem(data.name);
        res.redirect("/");
    },
];

const postDeletePool = [
    validateName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const pools = await readAllPools();
            return res.render("delete/pool", {
                title: "Delete Pool",
                errors: errors.array(),
                pools: pools,
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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const items = await readAllItems();
            const pools = await readAllPools();
            return res.render("delete/pool", {
                title: "Delete Item to Pool",
                errors: errors.array(),
                items: items,
                pools: pools,
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
