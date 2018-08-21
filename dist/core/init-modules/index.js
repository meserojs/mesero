"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _0_init_logger_1 = require("./0-init-logger");
const _1_init_model_1 = require("./1-init-model");
const _2_init_controller_1 = require("./2-init-controller");
const _3_init_service_1 = require("./3-init-service");
const _4_init_interceptor_1 = require("./4-init-interceptor");
const _5_init_jwt_1 = require("./5-init-jwt");
exports.default = (config) => ({
    logger: _0_init_logger_1.default(config),
    model: _1_init_model_1.default(config),
    controller: _2_init_controller_1.default(config),
    service: _3_init_service_1.default(config),
    interceptor: _4_init_interceptor_1.default(config),
    jwt: _5_init_jwt_1.default(config)
});
