"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _factory_1 = require("./@factory");
exports.queue = [];
const decorator = new _factory_1.default({
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
