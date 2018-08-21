"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sleep(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
};
