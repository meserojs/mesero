"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var controller_1 = require("./controller");
var interceptor_1 = require("./interceptor");
var service_1 = require("./service");
var get_config_1 = require("./common/get-config");
var Mesero = /** @class */ (function () {
    function Mesero() {
        console.log('model queue: ', model_1.queue);
        console.log('controller queue: ', controller_1.queue);
        console.log('interceptor queue: ', interceptor_1.queue);
        console.log('service queue: ', service_1.queue);
        this.config = get_config_1.default();
        console.log(this.config);
    }
    Mesero.prototype.start = function () {
    };
    return Mesero;
}());
exports.default = Mesero;
