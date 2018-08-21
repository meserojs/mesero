"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_factory_1 = require("./common/decorator-factory");
exports.queue = [];
const decorator = new decorator_factory_1.default({});
exports.Controller = decorator.entry(exports.queue);
