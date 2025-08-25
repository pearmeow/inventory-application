const { body, validationResult, matchedData } = require("express-validator");
const {
    updateItem,
    updatePool,
    readAllItems,
    readAllPools,
} = require("../db/queries.js");

const getUpdate = (req, res) => {
    res.render("update", { title: "Update", errors: [] });
};

const getUpdateItem = async (req, res) => {
    const items = await readAllItems();
    res.render("update/item", {
        title: "Update Item",
        errors: [],
        items: items,
    });
};

const getUpdatePool = async (req, res) => {
    const pools = await readAllPools();
    res.render("update/pool", {
        title: "Update Pool",
        errors: [],
        pools: pools,
    });
};

const validatePair = [
    body("oldName").trim().notEmpty().withMessage("Old name must not be empty"),
    body("newName")
        .trim()
        .notEmpty()
        .withMessage("New name must not be empty")
        .isLength({ max: 64 })
        .withMessage("Name must be less than or equal to 64 characters"),
];

const postUpdateItem = [
    validatePair,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const items = await readAllItems();
            return res.render("update/item", {
                title: "Update Item",
                errors: errors.array(),
                items: items,
            });
        }
        const data = matchedData(req);
        updateItem(data.oldName, data.newName);
        res.redirect("/");
    },
];

const postUpdatePool = [
    validatePair,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const pools = await readAllPools();
            return res.render("update/pool", {
                title: "Update Pool",
                errors: errors.array(),
                pools: pools,
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
