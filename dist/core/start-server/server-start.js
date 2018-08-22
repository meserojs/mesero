"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const socketIO = require("socket.io");
function default_1(app, modules) {
    const { config } = modules;
    return new Promise((resolve) => {
        if (config.isUseSocketIO) {
            const server = http.createServer(app.callback());
            modules.io = socketIO(server);
            server.listen(config.port, resolve);
        }
        else {
            app.listen(config.port, resolve);
        }
    });
}
exports.default = default_1;
