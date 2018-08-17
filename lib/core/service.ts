import Factory from './common/decorator-factory'

export const queue: Array<ServiceSettingsAttr> = []

const decorator = new Factory<ServiceSettingsAttr>({
  class: null
})

export const Service: Service = <Service>decorator.entry(queue)
