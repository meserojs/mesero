"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_factory_1 = require("./common/decorator-factory");
exports.queue = [];
var factory = new decorator_factory_1.default({
    class: null,
    serverBeforeStart: [],
    serverStarted: [],
});
exports.Interceptor = factory.entry(exports.queue);
exports.Interceptor.ServerBeforeStart = factory.createSettings(function (Target, key, descriptor) {
    Target.__settings__.serverBeforeStart.push(Target[key]);
    return Target;
});
exports.Interceptor.ServerStarted = factory.createSettings(function (Target, key, descriptor) {
    Target.__settings__.serverStarted.push(Target[key]);
    return Target;
});
