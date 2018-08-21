"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interceptor_1 = require("../decorators/interceptor");
exports.default = (config) => {
    const interceptor = {
        serverBeforeStart: [],
        serverStarted: []
    };
    for (let item of interceptor_1.queue) {
        const { serverBeforeStart, serverStarted } = item;
        interceptor.serverBeforeStart = interceptor.serverBeforeStart.concat(serverBeforeStart);
        interceptor.serverStarted = interceptor.serverStarted.concat(serverStarted);
    }
    return interceptor;
};
