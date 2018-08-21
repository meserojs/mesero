"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../decorators/controller");
exports.default = (config) => {
    const controller = {};
    for (let item of controller_1.queue) {
        const { class: ClassObject } = item;
        controller[ClassObject.name] = new ClassObject();
    }
    return controller;
};
