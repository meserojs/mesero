"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = {};
exports.routes = routes;
const Router = new Proxy({}, {
    get(obj, key) {
        !routes[key] && (routes[key] = {});
        return (url) => {
            return {
                to(joiner) {
                    Array.isArray(url) ? url.forEach(item => {
                        routes[key][item] = joiner;
                    }) : routes[key][url] = joiner;
                    return Router;
                }
            };
        };
    }
});
exports.Router = Router;
