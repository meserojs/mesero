"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_factory_1 = require("./common/decorator-factory");
exports.queue = [];
var decorator = new decorator_factory_1.default({
    class: null,
    db: '',
    table: '',
    field: {},
    sql: [],
    method: []
});
exports.Model = decorator.entry(exports.queue);
exports.Model.DB = function (db) { return decorator.createSettingsInPrototype(function (Target, key, descriptor) {
    Target.prototype.__settings__.db = db;
    return Target;
}); };
exports.Model.Table = function (name) { return decorator.createSettingsInPrototype(function (Target, key, descriptor) {
    Target.prototype.__settings__.table = name;
    return Target;
}); };
exports.Model.Field = function (name, attr) { return decorator.createSettingsInPrototype(function (Target, key, descriptor) {
    Target.prototype.__settings__.field[name] = attr;
    return Target;
}); };
exports.Model.SQL = decorator.createSettings(function (Target, key, descriptor) {
    Target.__settings__.sql.push(Target[key]);
    return Target;
});
exports.Model.Method = decorator.createSettings(function (Target, key, descriptor) {
    Target.__settings__.method.push(Target[key]);
    return Target;
});
