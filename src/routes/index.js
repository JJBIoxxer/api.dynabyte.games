const fs = require("fs");
const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Welcome to the DynabyteGames API! 🦖" }));

console.log("Loading route files...");

const routeFiles = fs.readdirSync(__dirname).filter(file => path.extname(file) === ".js" && file.slice(0, -3).toLowerCase() !== "index");

for (const file of routeFiles) {
    try {
        const route = require(path.join(__dirname, file));
        router.use(route.path, route.router);
    } catch (err) {
        console.error(`❌ Unexpected error occurred while initializing ${file} => ${err.stack}`);
    }
}

module.exports = { path: "/v1", router };