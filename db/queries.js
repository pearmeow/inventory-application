const pool = require("./pool");

async function createItem(itemName) {
    await pool.query("INSERT INTO items (name) values($1)", [itemName]);
}

async function createPool(poolName) {
    await pool.query("INSERT INTO pools (name) values($1)", [poolName]);
}

async function createItemToPool(itemName, poolName) {
    await pool.query(
        "INSERT INTO item_to_pool (item, pool) values(($1), ($2))",
        [itemName, poolName],
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

async function readItemsFromPool(poolName) {
    const { rows } = await pool.query(
        "SELECT * FROM item_to_pool WHERE pool=($1)",
        [poolName],
    );
    return rows;
}

async function updateItem(itemName, newName) {
    await pool.query("UDPATE items SET name=($1) WHERE name=($2)", [
        newName,
        itemName,
    ]);
}

async function updatePool(poolName, newName) {
    await pool.query("UDPATE pools SET name=($1) WHERE name=($2)", [
        newName,
        poolName,
    ]);
}

async function deleteItem(itemName) {
    await pool.query("DELETE FROM items * where name=($1)", [itemName]);
}

async function deletePool(poolName) {
    await pool.query("DELETE FROM pools * where name=($1)", [poolName]);
}

async function deleteItemToPool(itemName, poolName) {
    await pool.query(
        "DELETE FROM item_to_pool * WHERE pool=($1) AND item=($2)",
        [poolName, itemName],
    );
}

async function deleteAll() {
    await pool.query("DELETE FROM pools *");
    await pool.query("DELETE FROM items *");
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
    deleteAll,
};
