import Factory from '../common/decorator-factory'

export const queue: DecoratorQueue<ControllerSettingsAttr> = []

const decorator = new Factory<ControllerSettingsAttr>({})

export const Controller: ControllerDecorator = <ControllerDecorator>decorator.entry(queue)
