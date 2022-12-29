const HttpError = require("../util/HttpError");

module.exports = (err, req, res, next) => {
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    if (err instanceof HttpError) statusCode = err.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
    });
}