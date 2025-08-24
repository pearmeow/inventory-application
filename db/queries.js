const pool = require("./pool");

async function createItem(itemName) {
    await pool.query("INSERT INTO items (name) values($1)", [itemName]);
}

async function createPool(poolName) {
    await pool.query("INSERT INTO pools (name) values($1)", [poolName]);
}

async function createItemToPool(itemId, poolId) {
    await pool.query(
        "INSERT INTO item_to_pool (item, pool) values(($1), ($2))",
        [itemId, poolId],
    );
}

async function readAllPools() {
    const { rows } = await pool.query("SELECT * FROM pools");
    return rows;
}

async function readAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function readItemsFromPool(poolId) {
    const { rows } = await pool.query(
        "SELECT * FROM item_to_pool WHERE pool=($1)",
        [poolId],
    );
    return rows;
}

async function updateItem(itemId, newName) {
    await pool.query("UDPATE items SET name=($1) WHERE id=($2)", [
        newName,
        itemId,
    ]);
}

async function updatePool(poolId, newName) {
    await pool.query("UDPATE pools SET name=($1) WHERE id=($2)", [
        newName,
        poolId,
    ]);
}

async function deleteItem(itemId) {
    await pool.query("DELETE FROM item_to_pool * WHERE item=($1)", [itemId]);
    await pool.query("DELETE FROM items * where id=($1)", [itemId]);
}

async function deletePool(poolId) {
    await pool.query("DELETE FROM item_to_pool * WHERE pool=($1)", [poolId]);
    await pool.query("DELETE FROM pools * where id=($1)", [poolId]);
}

async function deleteItemToPool(itemId, poolId) {
    await pool.query(
        "DELETE FROM item_to_pool * WHERE pool=($1) AND item=($2)",
        [poolId, itemId],
    );
}

module.exports = {
    createItem,
    createPool,
    createItemToPool,
    readAllItems,
    readAllPools,
    readItemsFromPool,
    updateItem,
    updatePool,
    deleteItem,
    deletePool,
    deleteItemToPool,
};
