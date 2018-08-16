import Factory from './common/decorator-factory'

export const queue: Array<ServiceSettingsAttr> = []

const factory = new Factory<ServiceSettingsAttr>({
  class: null
})

export const Service: Service = <Service>factory.entry(queue)
