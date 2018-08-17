"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_factory_1 = require("./common/decorator-factory");
exports.queue = [];
var decorator = new decorator_factory_1.default({
    class: null,
    serverBeforeStart: [],
    serverStarted: []
});
exports.Interceptor = decorator.entry(exports.queue);
exports.Interceptor.ServerBeforeStart = decorator.createSettings(function (Target, key, descriptor) {
    Target.__settings__.serverBeforeStart.push(Target[key]);
    return Target;
});
exports.Interceptor.ServerStarted = decorator.createSettings(function (Target, key, descriptor) {
    Target.__settings__.serverStarted.push(Target[key]);
    return Target;
});
