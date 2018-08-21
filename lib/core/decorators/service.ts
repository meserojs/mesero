import Factory from '../common/decorator-factory'

export const queue: DecoratorQueue<ServiceSettingsAttr> = []

const decorator = new Factory<ServiceSettingsAttr>({})

export const Service: ServiceDecorator = <ServiceDecorator>decorator.entry(queue)
