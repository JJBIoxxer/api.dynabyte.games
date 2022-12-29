module.exports = class HttpError {
    constructor(errorMessage, statusCode) {
        this.statusCode = statusCode || 500;
        this.message = errorMessage;
        Error.captureStackTrace(this, this.constructor);
    }
}