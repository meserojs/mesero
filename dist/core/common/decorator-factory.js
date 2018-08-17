"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory = /** @class */ (function () {
    function Factory(attr) {
        var _this = this;
        this.entry = function (queue) {
            return function (Target, key, descriptor) {
                var setClass = function () {
                    !Target.prototype.__settings__.class && (Target.prototype.__settings__.class = Target);
                    queue.push(Target.prototype.__settings__);
                    return Target;
                };
                if (!Target.prototype.__settings__) {
                    _this.createSettings(void 0, true)(Target, key, descriptor);
                }
                return setClass();
            };
        };
        this.attr = attr;
    }
    Factory.prototype.createSettings = function (callback, isInPrototype) {
        var _this = this;
        if (isInPrototype === void 0) { isInPrototype = false; }
        var setSettingsInit = function (Target, key, descriptor) {
            var subject = isInPrototype ? Target.prototype : Target;
            typeof subject.__settings__ === 'undefined' && (subject.__settings__ = _this.attr);
            subject.__settings__.class = Target;
            return (callback && callback(Target, key, descriptor)) || Target;
        };
        return setSettingsInit;
    };
    Factory.prototype.createSettingsInPrototype = function (callback) {
        return this.createSettings(callback, true);
    };
    return Factory;
}());
exports.default = Factory;
