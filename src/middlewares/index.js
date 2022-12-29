const fs = require("fs");
const path = require("path");

const middlewareFiles = fs.readdirSync(__dirname).filter(file => path.extname(file) === ".js" && file.slice(0, -3).toLowerCase() !== "index");

for (const file of middlewareFiles) {
    try {
        const middleware = require(path.join(__dirname, file));
        module.exports[file.slice(0, -3)] = middleware;
    } catch (err) {
        console.error(`Unexpected error occurred while initializing ${file} => ${err.stack}`);
    }
}