const express = require("express");
const axios = require("axios");

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });

const HttpError = require("../util/HttpError");

const router = express.Router();

router.post("/", limiter, validator, async (req, res, next) => {
    try {
        const { body } = req;

        await axios.request({
            url: body.url,
            method: body.method.toUpperCase(),
            headers: body.headers,
            body: body.body
        }).then(response => res.status(response.status).send(response.data)).catch(err => {
            if (!err.response) next(new HttpError(err.statusMessage, err.statusCode));
            res.status(err.response.statusCode).send(err.response.data);
        });
    } catch (err) {
        next(new HttpError(err.message));
    }
});

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function validator(req, res, next) {
    if (!req.body) next(new HttpError("Requests to this endpoint must include a body.", 400));

    const { url, method } = req.body;

    if (!url || typeof url !== "string" || url.length == 0) next(new HttpError("The \"url\" parameter is required and must be a non-empty string.", 400));
    
    if (!method || typeof method !== "string" || method.length == 0) next(new HttpError("The \"method\" parameter is required and must be a non-empty string.", 400));
    if (!method.toUpperCase() in ALLOWED_METHODS) next(new HttpError("The provided method isn't allowed.", 405));

    next();
}

module.exports = { path: "/proxy", router };