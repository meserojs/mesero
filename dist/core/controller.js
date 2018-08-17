"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_factory_1 = require("./common/decorator-factory");
exports.queue = [];
var decorator = new decorator_factory_1.default({
    class: null
});
exports.Controller = decorator.entry(exports.queue);
