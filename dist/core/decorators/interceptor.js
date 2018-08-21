"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_factory_1 = require("../common/decorator-factory");
exports.queue = [];
const decorator = new decorator_factory_1.default({
    serverBeforeStart: [],
    serverStarted: []
});
exports.Interceptor = decorator.entry(exports.queue);
exports.Interceptor.ServerBeforeStart = decorator.createSettings((Target, key, descriptor) => {
    Target.__settings__.serverBeforeStart.push(Target[key]);
    return Target;
});
exports.Interceptor.ServerStarted = decorator.createSettings((Target, key, descriptor) => {
    Target.__settings__.serverStarted.push(Target[key]);
    return Target;
});
