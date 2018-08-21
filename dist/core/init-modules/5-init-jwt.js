"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const jwt = require("jsonwebtoken");
function default_1(config) {
    if (!config.jwt) {
        return undefined;
    }
    let { key, maxAge, secret } = config.jwt;
    secret && fs.existsSync(secret) && (key = fs.readFileSync(secret, 'utf8'));
    const sign = function (data, time) {
        return jwt.sign({ data }, key, { expiresIn: time || maxAge || 24 * 60 * 60 * 1000 });
    };
    const verify = function (token) {
        try {
            const decoded = jwt.verify(token, key);
            return decoded.data;
        }
        catch (err) {
            return undefined;
        }
    };
    return { sign, verify };
}
exports.default = default_1;
