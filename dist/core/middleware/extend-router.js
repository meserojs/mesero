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
const CTX_ERROR_FLAG = '[ctx.error]';
const extendRouter = function (app, modules) {
    const { config, logger } = modules;
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        if (config.crossDomain) {
            ctx.set('Access-Control-Allow-Origin', config.crossDomain.origin || '*');
            ctx.set('Access-Control-Allow-Headers', config.crossDomain.headers || 'Content-Type, Content-Length');
            ctx.set('Access-Control-Allow-Methods', config.crossDomain.methods || 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS');
            if (ctx.method === 'OPTIONS') {
                ctx.status = 200;
                return void 0;
            }
        }
        ctx.error = function (msg) {
            /* eslint-disable no-throw-literal */
            throw `${CTX_ERROR_FLAG}${msg}`;
        };
        try {
            yield next();
        }
        catch (error) {
            if (typeof error === 'string' && error.indexOf(CTX_ERROR_FLAG) === 0) {
                ctx.body = { error: error.split(CTX_ERROR_FLAG)[1] };
            }
            else {
                console.log(error) && logger.error(error);
            }
        }
    });
};
exports.default = extendRouter;
