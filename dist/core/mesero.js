"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_config_1 = require("./common/get-config");
const init_modules_1 = require("./init-modules");
const start_server_1 = require("./start-server");
const util_1 = require("./common/util");
class Mesero {
    constructor() {
        this.store = {};
        this.util = util_1.default;
        this.config = get_config_1.default();
        const { logger, model, controller, service, interceptor, jwt } = init_modules_1.default(this.config);
        this.logger = logger;
        this.model = model;
        this.controller = controller;
        this.service = service;
        this.interceptor = interceptor;
        this.jwt = jwt;
    }
    start() {
        start_server_1.default({
            config: this.config,
            model: this.model,
            controller: this.controller,
            service: this.service,
            interceptor: this.interceptor,
            logger: this.logger,
            store: this.store,
            jwt: this.jwt,
            router: this.router,
            util: this.util,
            io: this.io
        });
    }
}
exports.default = Mesero;
