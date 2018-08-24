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
const server_before_start_1 = require("./server-before-start");
const server_start_1 = require("./server-start");
const server_started_1 = require("./server-started");
const middleware_1 = require("../middleware");
const BODY_LIMIT_SIZE = 100000;
function default_1(modules) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = modules;
        yield server_before_start_1.default(modules);
        const app = new Koa();
        middleware_1.default.queue.forEach((middlewareItem) => {
            const plugin = middlewareItem(app, modules);
            plugin && app.use(plugin);
        });
        // default koa middleware plugin
        app
            .use(KoaStatic(config.dir.static))
            .use(KoaViews(config.dir.view, { extension: 'ejs' }))
            .use(KoaBody({ jsonLimit: BODY_LIMIT_SIZE, formLimit: BODY_LIMIT_SIZE, textLimit: BODY_LIMIT_SIZE }))
            .use(modules.router.routes())
            .use(modules.router.allowedMethods());
        yield server_start_1.default(app, modules);
        yield server_started_1.default(modules);
    });
}
exports.default = default_1;
