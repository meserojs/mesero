"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaSession = require("koa-session");
const isInjectSession = function (app, modules) {
    const { config } = modules;
    if (config.session) {
        const key = config.session.key || 'naso';
        app.keys = [key];
        return KoaSession({ key, maxAge: config.session.maxAge || 24 * 60 * 60 * 1000 }, app);
    }
};
exports.default = isInjectSession;
