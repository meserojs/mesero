"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const router_1 = require("../common/router");
function default_1(modules) {
    const router = new KoaRouter();
    for (let method in router_1.routes) {
        for (let url in router_1.routes[method]) {
            const joiner = router_1.routes[method][url](modules);
            Array.isArray(joiner) ? router[method](url, ...joiner) : router[method](url, joiner);
        }
    }
    return router;
}
exports.default = default_1;
