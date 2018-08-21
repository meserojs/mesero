"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../decorators/service");
exports.default = (config) => {
    const service = {};
    for (let item of service_1.queue) {
        const { class: ClassObject } = item;
        service[ClassObject.name] = new ClassObject();
    }
    return service;
};
