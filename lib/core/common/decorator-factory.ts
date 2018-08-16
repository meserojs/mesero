import { queue } from './../controller';
export default class Factory<T extends decoratorType> {
  public attr: T

  constructor (attr: T) {
    this.attr = attr
  }

  public createSettings (callback: void | decoratorFunction<T>, isInPrototype?: boolean): decoratorFunction<T>
  public createSettings (callback, isInPrototype = false) {
    return (Target, key, descriptor) => {
      const subject = isInPrototype ? Target.prototype : Target

      typeof subject.__settings__ === 'undefined' && (subject.__settings__ = this.attr)

      subject.__settings__.class = Target

      return callback && callback(Target, key, descriptor)
    }
  }

  public createSettingsInPrototype (callback: void | decoratorFunction<T>): decoratorFunction<T> {
    return this.createSettings(callback, true)
  }

  public entry: (queue: Array<T>) => decoratorFunction<T> = (queue) => {
    return (Target, key, descriptor) => {
      const setClass = (): Target<T> => {
        !Target.prototype.__settings__.class && (Target.prototype.__settings__.class = Target)

        queue.push(Target.prototype.__settings__)

        return Target
      }

      if (!Target.prototype.__settings__) {
        this.createSettings(void 0, true)(Target, key, descriptor)
      }

      return setClass()
    }
  }
}

