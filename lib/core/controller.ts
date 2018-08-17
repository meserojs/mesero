import Factory from './common/decorator-factory'

export const queue: Array<ControllerSettingsAttr> = []

const decorator = new Factory<ControllerSettingsAttr>({
  class: null
})

export const Controller: Controller = <Controller>decorator.entry(queue)
