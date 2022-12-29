const HttpError = require("../util/HttpError");

module.exports = (req, res, next) => {
    next(new HttpError(`🔍 | Not Found | ${req.originalUrl}`, 404));
}