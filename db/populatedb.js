#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS item_to_pool;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS pools;

CREATE TABLE items(
    name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE pools(
    name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE item_to_pool(
    item VARCHAR(64) REFERENCES items(name)
        ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    pool VARCHAR(64) REFERENCES pools(name)
        ON UPDATE CASCADE ON DELETE CASCADE NOT NULL
);

INSERT INTO items (name) VALUES('Brimstone');
INSERT INTO items (name) VALUES('Sacred Heart');
INSERT INTO items (name) VALUES('The Wafer');
INSERT INTO items (name) VALUES('Dogma');
INSERT INTO items (name) VALUES('Echo Chamber');

INSERT INTO pools (name) VALUES('Treasure');
INSERT INTO pools (name) VALUES('Devil');
INSERT INTO pools (name) VALUES('Secret');
INSERT INTO pools (name) VALUES('Ultra Secret');
INSERT INTO pools (name) VALUES('Angel');

INSERT INTO item_to_pool (item, pool) VALUES('Brimstone', 'Ultra Secret');
INSERT INTO item_to_pool (item, pool) VALUES('Brimstone', 'Devil');
INSERT INTO item_to_pool (item, pool) VALUES('Sacred Heart', 'Ultra Secret');
INSERT INTO item_to_pool (item, pool) VALUES('Sacred Heart', 'Angel');
INSERT INTO item_to_pool (item, pool) VALUES('The Wafer', 'Angel');
INSERT INTO item_to_pool (item, pool) VALUES('The Wafer', 'Treasure');
INSERT INTO item_to_pool (item, pool) VALUES('Echo Chamber', 'Secret');
`;

DB_URL =
    argv[2] ||
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.PORT || 5432}/${process.env.DATABASE}`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: DB_URL,
        ssl: argv[2] && true,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
