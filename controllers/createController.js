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
    readAllItems,
    readAllPools,
} = require("../db/queries.js");

const getCreate = (req, res) => {
    res.render("create", { title: "Create" });
};
const getCreateItem = (req, res) => {
    res.render("create/item", { title: "Create Item", errors: [] });
};
const getCreatePool = (req, res) => {
    res.render("create/pool", { title: "Create Pool", errors: [] });
};
const getCreateItemToPool = async (req, res) => {
    const items = await readAllItems();
    const pools = await readAllPools();
    res.render("create/itemtopool", {
        title: "Add Item to Pool",
        errors: [],
        items: items,
        pools: pools,
    });
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
                errors: errors.array(),
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
                errors: errors.array(),
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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const items = await readAllItems();
            const pools = await readAllPools();
            return res.render("create/itemtopool", {
                title: "Add Item to Pool",
                errors: errors.array(),
                items: items,
                pools: pools,
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
