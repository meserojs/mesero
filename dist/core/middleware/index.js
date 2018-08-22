"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend_router_1 = require("./extend-router");
const inject_modules_1 = require("./inject-modules");
const is_inject_session_1 = require("./is-inject-session");
class MiddlewareClass {
    constructor() {
        this.queue = [];
    }
    add(func) {
        this.queue.push(func);
    }
}
const Middleware = new MiddlewareClass();
// default middleware plugin
Middleware.add(extend_router_1.default);
Middleware.add(inject_modules_1.default);
Middleware.add(is_inject_session_1.default);
exports.default = Middleware;
