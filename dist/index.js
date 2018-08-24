"use strict";
const mesero_1 = require("./core/mesero");
const model_1 = require("./core/decorators/model");
const controller_1 = require("./core/decorators/controller");
const interceptor_1 = require("./core/decorators/interceptor");
const service_1 = require("./core/decorators/service");
const router_1 = require("./core/common/router");
const middleware_1 = require("./core/middleware");
module.parent && module.parent.filename && (mesero_1.default.moduleParentFilename = module.parent.filename);
const mesero = {
    Mesero: mesero_1.default,
    Model: model_1.Model,
    Controller: controller_1.Controller,
    Interceptor: interceptor_1.Interceptor,
    Service: service_1.Service,
    Middleware: middleware_1.default,
    Router: router_1.Router
};
module.exports = mesero;
