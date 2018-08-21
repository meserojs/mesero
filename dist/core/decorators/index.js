"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _0_init_logger_1 = require("../init-modules/0-init-logger");
const _1_init_model_1 = require("../init-modules/1-init-model");
function default_1(config) {
    const logger = _0_init_logger_1.default(config);
    const model = _1_init_model_1.default(config);
    return { logger, model };
}
exports.default = default_1;
