"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _factory_1 = require("./@factory");
exports.queue = [];
const decorator = new _factory_1.default({
    db: '',
    table: '',
    field: {},
    sql: [],
    method: []
});
exports.Model = decorator.entry(exports.queue);
exports.Model.DB = db => decorator.createSettingsInPrototype((Target, key, descriptor) => {
    Target.prototype.__settings__.db = db;
    return Target;
});
exports.Model.Table = name => decorator.createSettingsInPrototype((Target, key, descriptor) => {
    Target.prototype.__settings__.table = name;
    return Target;
});
exports.Model.Field = (name, attr) => decorator.createSettingsInPrototype((Target, key, descriptor) => {
    Target.prototype.__settings__.field[name] = attr;
    return Target;
});
exports.Model.SQL = decorator.createSettings((Target, key, descriptor) => {
    Target.__settings__.sql.push(Target[key]);
    return Target;
});
exports.Model.Method = decorator.createSettings((Target, key, descriptor) => {
    Target.__settings__.method.push(Target[key]);
    return Target;
});
