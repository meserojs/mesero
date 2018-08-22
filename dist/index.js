"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mesero_1 = require("./core/mesero");
const model_1 = require("./core/decorators/model");
const controller_1 = require("./core/decorators/controller");
const interceptor_1 = require("./core/decorators/interceptor");
const service_1 = require("./core/decorators/service");
const router_1 = require("./core/common/router");
const middleware_1 = require("./core/middleware");
const mesero = {
    Mesero: mesero_1.default,
    Model: model_1.Model,
    Controller: controller_1.Controller,
    Interceptor: interceptor_1.Interceptor,
    Service: service_1.Service,
    router: router_1.default,
    Middleware: middleware_1.default
};
exports.default = mesero;
