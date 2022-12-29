const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const routes = require("./routes");
const middlewares = require("./middlewares");

const app = express();

app.set("trust proxy", 1);

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "OK 👍" }));

app.use(routes.path, routes.router);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

module.exports = app;