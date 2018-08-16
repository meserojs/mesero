import Factory from './common/decorator-factory'

export const queue: Array<ControllerSettingsAttr> = []

const factory = new Factory<ControllerSettingsAttr>({
  class: null
})

export const Controller: Controller = <Controller>factory.entry(queue)
