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
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaStatic = require("koa-static");
const KoaViews = require("koa-views");
const chalk_1 = require("chalk");
const boxen = require("boxen");
const CTX_ERROR_FLAG = '[ctx@error]';
function default_1({ config, model, controller, service, interceptor, router, logger }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serverBeforeStart, serverStarted } = interceptor;
        const beforeServerStart = () => __awaiter(this, void 0, void 0, function* () {
            for (let serverBeforeStartItemFunc of serverBeforeStart) {
                yield serverBeforeStartItemFunc();
            }
        });
        const afterServerStarted = () => __awaiter(this, void 0, void 0, function* () {
            console.log(boxen(chalk_1.default.yellow(`ENV: ${config.env}\nPort: ${config.port}\n${config.mysql ? `MySQL: ${Array.isArray(config.mysql) ? config.mysql.map(v => `${v.host}@${v.name}`).join(',') : `${config.mysql.host}@${config.mysql.name}`}` : ''}`), {
                padding: { left: 1, right: 1 },
                borderStyle: 'double',
                borderColor: 'yellow'
            }));
            for (let serverStartedItemFunc of serverStarted) {
                yield serverStartedItemFunc();
            }
        });
        yield beforeServerStart();
        new Koa()
            .use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.model = model;
            ctx.controller = controller;
            ctx.service = service;
            ctx.logger = logger;
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
                    throw error;
                }
            }
        }))
            .on('error', (error) => {
            logger.error(error);
        })
            .use(KoaStatic(config.dir.static))
            .use(KoaViews(config.dir.view, { extension: 'ejs' }))
            .use(KoaBody())
            .use(router.routes())
            .use(router.allowedMethods())
            .listen(config.port, afterServerStarted);
    });
}
exports.default = default_1;
