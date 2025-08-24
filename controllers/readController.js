const { query, validationResult, matchedData } = require("express-validator");

const {
    readAllItems,
    readAllPools,
    readItemsFromPool,
} = require("../db/queries");

const validateQuery = query("pool").trim().notEmpty().isString();

const getData = [
    validateQuery,
    async (req, res) => {
        const pools = await readAllPools();
        const errors = validationResult(req);
        if (!errors.isEmpty() || req.query.pool === undefined) {
            const items = await readAllItems();
            return res.render("index", {
                title: "All items",
                pools: pools,
                items: items,
            });
        }
        const selectedPool = req.query.pool;
        const items = await readItemsFromPool(selectedPool);
        return res.render("index", {
            title: selectedPool + " Room Pool",
            pools: pools,
            items: items,
        });
    },
];

module.exports = getData;
