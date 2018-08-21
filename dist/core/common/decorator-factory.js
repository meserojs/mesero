"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Factory {
    constructor(attr) {
        this.entry = (queue) => {
            return (Target, key, descriptor) => {
                const setClass = () => {
                    !Target.prototype.__settings__.class && (Target.prototype.__settings__.class = Target);
                    queue.push(Target.prototype.__settings__);
                    return Target;
                };
                if (!Target.prototype.__settings__) {
                    this.createSettings(void 0, true)(Target, key, descriptor);
                }
                return setClass();
            };
        };
        this.attr = attr;
    }
    createSettings(callback, isInPrototype = false) {
        const setSettingsInit = (Target, key, descriptor) => {
            const subject = isInPrototype ? Target.prototype : Target;
            typeof subject.__settings__ === 'undefined' && (subject.__settings__ = _.cloneDeep(this.attr));
            subject.__settings__.class = Target;
            return (callback && callback(Target, key, descriptor)) || Target;
        };
        return setSettingsInit;
    }
    createSettingsInPrototype(callback) {
        return this.createSettings(callback, true);
    }
}
exports.default = Factory;
