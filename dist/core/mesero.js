"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_config_1 = require("./common/get-config");
const init_modules_1 = require("./init-modules");
const start_server_1 = require("./start-server");
const router_1 = require("./common/router");
class Mesero {
    constructor() {
        this.store = {};
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
            router: router_1.default,
            store: this.store,
            jwt: this.jwt
        });
    }
}
exports.default = Mesero;
