"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const boxen = require("boxen");
function default_1(modules) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, interceptor } = modules;
        console.log(boxen(chalk_1.default.yellow(`ENV: ${config.env}\nPort: ${config.port}${config.mysql ? `\nMySQL: ${Array.isArray(config.mysql) ? config.mysql.map(v => `${v.host}@${v.name}`).join(',') : `${config.mysql.host}@${config.mysql.name}`}` : ''}`), {
            padding: { left: 1, right: 1 },
            borderStyle: 'double',
            borderColor: 'yellow'
        }));
        for (let item of interceptor.serverStarted) {
            yield item();
        }
    });
}
exports.default = default_1;
